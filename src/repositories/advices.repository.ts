import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Advices, AdvicesRelations} from '../models';

export class AdvicesRepository extends DefaultCrudRepository<
  Advices,
  typeof Advices.prototype.adviceId,
  AdvicesRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Advices, dataSource);
  }
}
