import {Client, expect} from '@loopback/testlab';
import {PockettherapyappApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: PockettherapyappApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /users', async () => {
    const res = await client.get('/users').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
