import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services/jwt.service';
import {autheticate} from './autenticate';

export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(JwtService)
    public authService: JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    const info = this.authService.VerifyToken(token);
    const profileData = autheticate(info, '2');

    return profileData;
  }
}
