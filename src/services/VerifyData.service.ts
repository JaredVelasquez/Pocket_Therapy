import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class VerifyData {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  async ExistUser(identificator: string) {
    if (!identificator)
      throw new HttpErrors[401]("No existe identificador");

    let user = await this.userRepository.findOne({where: {emailprimary: identificator}});

    if (!user)
      user = await this.userRepository.findOne({where: {phoneNumber: identificator}});

    if (!user)
      user = await this.userRepository.findOne({where: {username: identificator}});

    return user;
  }
}
