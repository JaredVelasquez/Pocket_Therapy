import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PocketTherapyDBO',
  connector: 'mssql',
  url: 'mssql://JaredVelasquez_SQLLogin_1:s3xt9pcs5d@PocketTherapy.mssql.somee.com/PocketTherapy',
  host: 'PocketTherapy.mssql.somee.com',
  port: 1433,
  user: 'JaredVelasquez_SQLLogin_1',
  password: 's3xt9pcs5d',
  database: 'PocketTherapy'
};

@lifeCycleObserver('datasource')
export class PocketTherapyDboDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'PocketTherapyDBO';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.PocketTherapyDBO', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
