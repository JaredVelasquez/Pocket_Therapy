import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Servicekeys as keys} from '../keys/services_keys';
import {ConfirmCode, Credentials, PasswordReset, PasswordResetData, PostPhoto, SetCode, UpdateProfile} from "../keys/User.models";
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt.service';
import {JwtService} from '../services/jwt.service';
import {Notifications} from '../services/notification.service';
var sessionstorage = require('sessionstorage');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET,
})
export class UserController {
  jwtService: JwtService;
  code: string;
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(Notifications)
    public notifications: Notifications,
  ) {
    this.jwtService = new JwtService(this.userRepository);
  }

  @authenticate('admin', 'user')
  @put('/update-profile', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async UpdateProfil(
    @requestBody() updateProfile: UpdateProfile
  ): Promise<boolean> {
    let identifyPost = await this.jwtService.VerifyExistUser(updateProfile.emailprimary);

    let update: any = {
      roleId: identifyPost.roleId,
      photoUrl: updateProfile.urlPhoto,
      firstName: updateProfile.firstName,
      lastName: updateProfile.lastName,
      emailprimary: updateProfile.emailprimary,
      phoneNumber: updateProfile.phoneNumber,
      username: updateProfile.username,
      passwordHash: identifyPost.passwordHash,
      status: identifyPost.status,
      createdAt: identifyPost.createdAt,
      updatedAt: Date.now()

    }

    this.userRepository.replaceById(identifyPost.userId, update);

    return true;
  }

  @authenticate('admin', 'user')
  @put('/update-photo', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async UpdatePhotoProfile(
    @requestBody() postPhoto: PostPhoto
  ): Promise<boolean> {
    if (!postPhoto.identificator)
      throw new HttpErrors[401]("No existe identidicador.");

    if (!postPhoto.route)
      throw new HttpErrors[401]("No selecciono ninguna imagen.");

    const newPhoto = await cloudinary.v2.uploader.upload(postPhoto.route, {
      upload_preset: 'PocketTherapy'
    });

    const user = await this.jwtService.VerifyExistUser(postPhoto.identificator);
    user.photoUrl = newPhoto.url;

    if (!user)
      throw new HttpErrors[401]("Usuario no valido.");


    this.userRepository.replaceById(user.userId, user);

    return true;
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.jwtService.IdentifyToken(credentials.username, credentials.password);
    if (user) {
      let tk = await this.jwtService.createToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("Usuario o contraseña inválidos.");
    }
  }

  @post('/generate-verify-code', {
    responses: {
      '200': {
        description: 'Codigo de verificacion'
      }
    }
  })
  async GenerateVerifyCode(
    @requestBody() confirmCode: ConfirmCode
  ): Promise<any> {
    let user = await this.userRepository.findOne({where: {emailprimary: confirmCode.email}});
    if (!user)
      user = await this.userRepository.findOne({where: {phoneNumber: confirmCode.email}});

    if (!user)
      throw new HttpErrors[401]("Usuario invalido.");

    const verificationCode = this.jwtService.GenerateVerificationCode();
    this.notifications.EmailNotification(confirmCode.email, verificationCode);

    return true;

  }

  @post('/verify-code', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async VerifyCode(
    @requestBody() setCode: SetCode
  ): Promise<any> {

    if (!setCode.code)
      throw new HttpErrors[401]("Codigo vacio.");

    if (!sessionstorage.getItem(keys.TIME_OUT_NAME))
      throw new HttpErrors[401]("No tiene un codigo de verificacion.");


    if (sessionstorage.getItem(keys.TIME_OUT_NAME) < Date.now()) {
      sessionstorage.clear()
      throw new HttpErrors[400]("El codigo expiro.");
    }

    if (setCode.code != sessionstorage.getItem(keys.VERIFICATION_CODE_NAME))
      throw new HttpErrors[401]("Codigo invalido.");

    if (setCode.code == sessionstorage.getItem(keys.VERIFICATION_CODE_NAME)) {
      sessionstorage.clear()
      return true;
    }

  }

  @post('/password-forgotten', {
    responses: {
      '200': {
        description: 'Resset password off acces'
      }
    }
  })
  async resetpass(
    @requestBody() passwordResetData: PasswordResetData
  ): Promise<boolean> {
    if (!passwordResetData.IsVerificated)
      throw new HttpErrors[400]("El usuario no esta verificado.");

    let newpassword = await this.jwtService.ResetPassword(passwordResetData.identificator, passwordResetData.newpassword);
    if (newpassword) {
      return true;
    }
    throw new HttpErrors[400]("Usuario no encontrado");
  }

  @authenticate('admin', 'user')
  @post('/password-reset', {
    responses: {
      '200': {
        description: 'Reset password in profile'
      }
    }
  })
  async reset(
    @requestBody() passwordReset: PasswordReset
  ): Promise<boolean> {
    let newpassword = await this.jwtService.ResetPassword(passwordReset.identificator, passwordReset.newpassword);
    if (newpassword)
      return true;

    throw new HttpErrors[400]("Usuario no encontrado");
  }

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: User,
  ): Promise<User> {
    let ExistUser = await this.jwtService.VerifyUserRegirterExist(user);
    if (ExistUser)
      throw new HttpErrors[400]("Este Usuario contiene informacion previamente registrada (correo, nombre de usuario o numero telefonico). ");

    let auxdocpas = user.passwordHash;
    user.status = "Active";
    user.roleId = 2;

    let passwordEncripted = new EncryptDecrypt().Encrypt(auxdocpas);
    user.passwordHash = passwordEncripted;

    let NewUser = await this.userRepository.create(user);

    return NewUser;
  }


  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate('admin')
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
