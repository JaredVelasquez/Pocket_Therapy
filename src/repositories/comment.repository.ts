import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocketTherapyDboDataSource} from '../datasources';
import {Comment, CommentRelations} from '../models';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.commentId,
  CommentRelations
> {
  constructor(
    @inject('datasources.PocketTherapyDBO') dataSource: PocketTherapyDboDataSource,
  ) {
    super(Comment, dataSource);
  }
}
