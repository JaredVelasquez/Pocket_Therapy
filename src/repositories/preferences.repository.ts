import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Preferences, PreferencesRelations} from '../models';

export class PreferencesRepository extends DefaultCrudRepository<
  Preferences,
  typeof Preferences.prototype.preferencesId,
  PreferencesRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Preferences, dataSource);
  }
}
