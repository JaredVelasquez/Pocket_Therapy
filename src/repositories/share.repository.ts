import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Share, ShareRelations} from '../models';

export class ShareRepository extends DefaultCrudRepository<
  Share,
  typeof Share.prototype.shareId,
  ShareRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Share, dataSource);
  }
}
