import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {PockettherapyappApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
  });

  const app = new PockettherapyappApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: PockettherapyappApplication;
  client: Client;
}
