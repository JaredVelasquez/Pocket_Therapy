import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Profile'}}})
export class Profile extends Entity {
  @property({
    type: 'string',
    required: false,
    length: 50,
    id: 1,
    mssql: {columnName: 'profile_id', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  profileId?: string;

  @property({
    type: 'string',
    length: 150,
    mssql: {columnName: 'photoUrl', dataType: 'nvarchar', dataLength: 150, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  photoUrl?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'firstName', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'lastName', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'emailprimary', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  emailprimary: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'emailsecundary', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  emailsecundary?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'twiter', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  twiter?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'facebook', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  facebook?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'linkedin', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  linkedin?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'phoneNumber', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: false,
    length: 50,
    mssql: {columnName: 'status', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  status?: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'updatedAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  updatedAt: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'docpass', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  docpass?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
