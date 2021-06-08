import {BindingScope, injectable} from '@loopback/core';
import {Servicekeys as keys} from '../keys/services_keys';
var sessionstorage = require('sessionstorage');

@injectable({scope: BindingScope.TRANSIENT})
export class verificationCode {
  constructor() { }


  Generate() {
    const timeout = Date.now() + keys.ONE_MINUTE_MILLISECONDS;
    sessionstorage.clear()
    sessionstorage.setItem(keys.TIME_OUT_NAME, timeout);
    sessionstorage.setItem(keys.VERIFICATION_CODE_NAME, keys.GENERATE_NEW_VERIFY_CODE());

    return sessionstorage.getItem(keys.VERIFICATION_CODE_NAME);
  }


}
