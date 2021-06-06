import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Like, LikeRelations} from '../models';

export class LikeRepository extends DefaultCrudRepository<
  Like,
  typeof Like.prototype.likeId,
  LikeRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Like, dataSource);
  }
}
