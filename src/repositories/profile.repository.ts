import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Profile, ProfileRelations} from '../models';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.profileId,
  ProfileRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Profile, dataSource);
  }
}
