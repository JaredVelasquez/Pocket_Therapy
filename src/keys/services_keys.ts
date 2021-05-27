
export namespace Servicekeys {
  export const JWT_SECRET_KEY = 'jwtSecret@Key*2021';
  export const ONE_HOUR_SECONDS = 3600;
  export const MILLISECONDS = 1000;
  export const ONE_MINUTE_MILLISECONDS = 60000;
  export const TOKEN_EXPIRATION_TIME = (Date.now() / MILLISECONDS) + (ONE_HOUR_SECONDS * 3);
  export const SENDER_EMAIL = 'JaredVelasquez@unitec.edu';
  export const SENDER_PHONE_NUMBER = '+50494978931';
  export const SENDGRID_TOKEN = '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';
  export const GENERATE_NEW_VERIFY_CODE = require('codeid');
  export const TIME_OUT_NAME = 'timeout_event';
  export const VERIFICATION_CODE_NAME = 'code';
  export const CLOUDINARY_NAME = 'jaredvelasquez';
  export const CLOUDINARY_API_KEY = '498742159759711';
  export const CLOUDINARY_API_SECRET = 'dRH1kYrR6mO2NqtsPXu_rgk58No';
}
