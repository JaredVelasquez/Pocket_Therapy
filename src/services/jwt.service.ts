import { /*inject,*/ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Servicekeys as keys} from '../keys/services_keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt_decrypt.service';

const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository

  ) {

  }

  createToken(user: User) {
    let secretKey = keys.JWT_SECRET_KEY;
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        UserID: user.userId,
        ProfileID: user.profileId,
        UserNAME: user.username,
        Role: user.roleId
      }
    }, secretKey);
    return token;
  }

  VerifyToken(token: string) {
    try {
      let decoded = jwt.verify(token, keys.JWT_SECRET_KEY);
      return decoded;
    } catch {
      return null;
    }
  }

  async IdentifyToken(username: string, password: string): Promise<User | false> {
    let user = await this.userRepository.findOne({where: {username: username}});

    console.log(`Username: ${user?.username} - Password: ${user?.password}`);
    if (!user) {
      user = await this.userRepository.findOne({where: {emailprimary: username}});
    }
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRUPT_METHOD).Encrypt(password);
      let cryptPassTwo = new EncryptDecrypt(keys.LOGIN_CRUPT_METHOD).Encrypt(cryptPass);

      console.log(`cryptPass: ${cryptPass}`);
      console.log(`cryptPass2: ${cryptPassTwo}`);
      if (user.passwordHash == cryptPassTwo) {
        return user;
      }
    }
    return false;
  }
}
