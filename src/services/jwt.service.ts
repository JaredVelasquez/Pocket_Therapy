import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Servicekeys as keys} from '../keys/services_keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt.service';

const jsonwebtoken = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

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

  async ResetPassword(username: string, newpassword: string): Promise<string | false> {
    let user = await this.userRepository.findOne({where: {emailprimary: username}});
    if (user) {
      newpassword = new EncryptDecrypt().Encrypt(newpassword);
      user.passwordHash = newpassword;
      this.userRepository.replaceById(user?.userId, user);
      return newpassword;
    }
    return false;
  }
}



