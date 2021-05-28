export class Credentials {
  username: string;
  password: string;
}

export class PasswordReset {
  identificator: string;
  newpassword: string;
}

export class PasswordResetData {
  identificator: string;
  IsVerificated: boolean;
  newpassword: string;
}

export class ConfirmCode {
  email: string;
}
export class SetCode {
  code: string;
}
export class UpdateProfile {
  urlPhoto: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  emailprimary: string;
}

export class PostPhoto {
  identificator: string;
}
