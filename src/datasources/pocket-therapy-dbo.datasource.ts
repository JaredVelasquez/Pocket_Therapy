import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PocketTherapyDBO',
  connector: 'mssql',
  url: 'mssql://jared:1234@DESKTOP-914IUVT/Pocket_Therapy',
  host: 'DESKTOP-914IUVT',
  port: 1433,
  user: 'jared',
  password: '1234',
  database: 'Pocket_Therapy'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
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
