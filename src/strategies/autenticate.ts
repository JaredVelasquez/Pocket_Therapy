import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

export const autheticate = async (info: any, role: any) => {

  const {UserID, UserNAME, Role} = info.data;
  if (info) {
    if (Role == role) {
      const profile: UserProfile = Object.assign({
        userid: UserID,
        username: UserNAME,
        role: Role,
      });
      return profile;
    } else {
      throw new HttpErrors[401](
        'El token es válido, pero no tiene los permisos suficientes para ejecutar esta acción.',
      );
    }
  } else {
    throw new HttpErrors[401]('El token enviado no es válido.');
  }
}
