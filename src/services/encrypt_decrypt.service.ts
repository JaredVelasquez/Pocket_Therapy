import {Servicekeys as keys} from '../keys/services_keys';
const CryptoJS = require('crypto-js');

export class EncryptDecrypt {
  type: string;
  constructor(type: string) {
    this.type = type;
  }

  Encrypt(password: string) {
    switch (this.type) {
      case keys.MD5:
        let passwordEncriptOne = CryptoJS.MD5(password).toString();
        let passwordEncriptTwo = CryptoJS.MD5(passwordEncriptOne).toString();
        return passwordEncriptTwo;
        break;
      case keys.AES:
        return CryptoJS.AES.encrypt(password, keys.AES_SECRET_KEY).toString();
        break;
      default:
        return "This trype of Encrypt is not supported";
        break;
    }
  }

}
