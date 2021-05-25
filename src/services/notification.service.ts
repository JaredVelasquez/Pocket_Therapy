import {BindingScope, injectable} from '@loopback/context';
import {Servicekeys as keys} from '../keys/services_keys';
const sgMail = require('@sendgrid/mail');

@injectable({scope: BindingScope.TRANSIENT})
export class Notifications {

  EmailNotification(email: string, codeVerification: any) {
    sgMail.setApiKey(keys.SENDGRID_TOKEN)
    const msg = {
      to: email,
      from: keys.SENDER_EMAIL,
      subject: 'Cambio de contraseña.',
      text: `Hola buen dia. Has solicitado un codigo de para recuperacion de contraseña, si es asi, su codigo es: ${codeVerification} `,

    }
    sgMail
      .send(msg)
      .then(() => {
        console.log("Correo enviado exitosamente.");
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
}
