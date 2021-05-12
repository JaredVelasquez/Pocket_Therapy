export namespace Servicekeys {
  export const MD5 = 'md5';
  export const AES = 'aes';
  export const AES_SECRET_KEY = 'AES@SecretKey*';
  export const LOGIN_CRYPT_METHOD = MD5;
  export const JWT_SECRET_KEY = 'jwtSecret@Key*2021';
  export const TOKEN_EXPIRATION_TIME = (Date.now() / 1000) + (60 * 60 * 10);
}
