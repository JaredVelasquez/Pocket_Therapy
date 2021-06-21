import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PocketTherapyDBO',
  connector: 'mssql',
  url: 'mssql://jared:1234@DESKTOP-914IUVT/PocketTherapyTest',
  host: 'DESKTOP-914IUVT',
  port: 1433,
  user: 'jared',
  password: '1234',
  database: 'PocketTherapyTest'
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
