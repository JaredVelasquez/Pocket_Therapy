const CryptoJS = require('crypto-js');

export class EncryptDecrypt {
  constructor() {
  }


  Encrypt(password: string) {
    let encryptNumber = 0;
    while (encryptNumber < 2) {
      password = CryptoJS.MD5(password).toString();
      encryptNumber++;
    }
    return password;
  }

}
