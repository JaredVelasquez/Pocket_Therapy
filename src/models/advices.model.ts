import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Advices'}}})
export class Advices extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'advice_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  adviceId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'hashtag_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  hashtagId: number;

  @property({
    type: 'string',
    required: true,
    length: 800,
    mssql: {columnName: 'contentAdvice', dataType: 'nvarchar', dataLength: 800, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  contentAdvice: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'authorAdvice', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  authorAdvice: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'urlCitation', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  urlCitation?: string;

  @property({
    type: 'date',
    mssql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createdAt?: string;

  @property({
    type: 'date',
    mssql: {columnName: 'updatedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  updatedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Advices>) {
    super(data);
  }
}

export interface AdvicesRelations {
  // describe navigational properties here
}

export type AdvicesWithRelations = Advices & AdvicesRelations;
