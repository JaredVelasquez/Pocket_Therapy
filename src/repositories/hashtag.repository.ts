import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Hashtag, HashtagRelations} from '../models';

export class HashtagRepository extends DefaultCrudRepository<
  Hashtag,
  typeof Hashtag.prototype.hastagId,
  HashtagRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Hashtag, dataSource);
  }
}
