import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Comunity, ComunityRelations} from '../models';

export class ComunityRepository extends DefaultCrudRepository<
  Comunity,
  typeof Comunity.prototype.id,
  ComunityRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Comunity, dataSource);
  }
}
