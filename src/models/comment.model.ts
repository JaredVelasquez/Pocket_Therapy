import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Comment'}}})
export class Comment extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'comment_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  commentId?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'user_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'post_id', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  postId: string;

  @property({
    type: 'string',
    required: true,
    length: 500,
    mssql: {columnName: 'contentComment', dataType: 'nvarchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  contentComment: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'updateAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  updateAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
