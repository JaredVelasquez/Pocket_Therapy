import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Servicekeys as keys} from '../keys/services_keys';
import {Profile} from '../models';
import {ProfileRepository, UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt.service';

const shortid = require('shortid');

class NewUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  docpass: string;
}

@authenticate('admin')
export class ProfileController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @authenticate.skip()
  @post('/profiles')
  @response(200, {
    description: 'Profile model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profile)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {
            title: 'NewProfile',
            exclude: ['id'],
          }),
        },
      },
    })
    profile: Omit<Profile, 'id'>,
  ): Promise<Profile> {
    let auxdocpas = profile.docpass;
    let auxid = shortid.generate();
    profile.profileId = auxid;
    profile.docpass = null;
    profile.status = "Active";

    let m = await this.profileRepository.create(profile);

    let password1 = new EncryptDecrypt(keys.MD5).Encrypt(auxdocpas);
    let password2 = new EncryptDecrypt(keys.MD5).Encrypt(password1);

    console.log(`Encript: ${password2}`);

    let newUser = {
      profileId: auxid,
      roleId: 2,
      username: m.emailprimary,
      passwordHash: password2,
      status: m.status,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt
    };

    let u = await this.userRepository.create(newUser);

    return m;
  }

  @authenticate.skip()
  @get('/profiles/count')
  @response(200, {
    description: 'Profile model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.profileRepository.count(where);
  }

  @authenticate.skip()
  @get('/profiles')
  @response(200, {
    description: 'Array of Profile model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profile, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profile) filter?: Filter<Profile>,
  ): Promise<Profile[]> {
    return this.profileRepository.find(filter);
  }

  @patch('/profiles')
  @response(200, {
    description: 'Profile PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.profileRepository.updateAll(profile, where);
  }

  @authenticate.skip()
  @get('/profiles/{id}')
  @response(200, {
    description: 'Profile model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profile, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Profile, {exclude: 'where'}) filter?: FilterExcludingWhere<Profile>
  ): Promise<Profile> {
    return this.profileRepository.findById(id, filter);
  }

  @patch('/profiles/{id}')
  @response(204, {
    description: 'Profile PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
  ): Promise<void> {
    await this.profileRepository.updateById(id, profile);
  }

  @put('/profiles/{id}')
  @response(204, {
    description: 'Profile PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() profile: Profile,
  ): Promise<void> {
    await this.profileRepository.replaceById(id, profile);
  }

  @del('/profiles/{id}')
  @response(204, {
    description: 'Profile DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.profileRepository.deleteById(id);
  }
}
