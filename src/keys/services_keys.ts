export namespace Servicekeys {
  export const JWT_SECRET_KEY = 'jwtSecret@Key*2021';
  export const TOKEN_EXPIRATION_TIME = (Date.now() / 1000) + (60 * 60 * 10);
}
