import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Servicekeys as keys} from '../keys/services_keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt.service';
var sessionstorage = require('sessionstorage');
const jsonwebtoken = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  async CleanImageIdentificator(identificator: string) {
    identificator = identificator.replace('.jpg', '');
    identificator = identificator.replace('.jpeg', '');
    identificator = identificator.replace('.png', '');
    identificator = identificator.replace('.svg', '');

    return identificator;
  }

  async VerifyUserRegirterExist(userModel: User) {

    if (!userModel)
      throw new HttpErrors[401]("No existe informacion para registrar");

    let user = await this.userRepository.findOne({where: {emailprimary: userModel.emailprimary}});

    if (!user)
      user = await this.userRepository.findOne({where: {phoneNumber: userModel.phoneNumber}});

    if (!user)
      user = await this.userRepository.findOne({where: {username: userModel.username}});

    if (!user)
      return false;

    if (user)
      return true

  }

  async VerifyExistUser(identificator: string) {
    if (!identificator)
      throw new HttpErrors[401]("No existe identificador");

    let user = await this.userRepository.findOne({where: {emailprimary: identificator}});

    if (!user)
      user = await this.userRepository.findOne({where: {phoneNumber: identificator}});

    if (!user)
      user = await this.userRepository.findOne({where: {username: identificator}});

    if (!user)
      throw new HttpErrors[401]("El usuario no esta registrado");

    return user;
  }

  GenerateVerificationCode() {
    const timeout = Date.now() + keys.ONE_MINUTE_MILLISECONDS;
    sessionstorage.clear()
    sessionstorage.setItem(keys.TIME_OUT_NAME, timeout);
    sessionstorage.setItem(keys.VERIFICATION_CODE_NAME, keys.GENERATE_NEW_VERIFY_CODE());

    return sessionstorage.getItem(keys.VERIFICATION_CODE_NAME);
  }

  createToken(user: User) {
    let token = jsonwebtoken.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        UserID: user.userId,
        UserNAME: user.username,
        Role: user.roleId
      }
    }, keys.JWT_SECRET_KEY);
    return token;
  }

  VerifyToken(token: string) {

    let decoded = jsonwebtoken.verify(token, keys.JWT_SECRET_KEY);
    if (decoded)
      return decoded;
    else
      throw new HttpErrors[401]("Token vacio");
  }

  async IdentifyToken(username: string, password: string): Promise<User | false> {
    let user = await this.userRepository.findOne({where: {username: username}});
    if (!user) {
      user = await this.userRepository.findOne({where: {emailprimary: username}});
    }
    if (user) {
      let cryptPass = new EncryptDecrypt().Encrypt(password);
      if (user.passwordHash == cryptPass) {
        return user;
      }
    }
    return false;
  }

  async ResetPassword(identificador: string, newpassword: string): Promise<string | false> {
    let user = await this.VerifyExistUser(identificador);
    if (user) {
      newpassword = new EncryptDecrypt().Encrypt(newpassword);
      user.passwordHash = newpassword;
      this.userRepository.replaceById(user?.userId, user);
      return newpassword;
    }
    return false;
  }
}



