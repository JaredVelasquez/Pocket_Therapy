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


  it('Verification code generation test', async () => {
    const res = await client.post('/generate-verify-code').send({email: 'jared.velasquez1122@gmail.com'}).expect(200);
    expect(res.body).to.containEql(Boolean);
  });


  it('Changue password', async () => {
    const res = await client.post('/password-forgotten').send({
      identificator: 'jared.velasquez1122@gmail.com',
      IsVerificated: true,
      newpassword: '123soleado'
    }).expect(200);
    expect(res.body).to.containEql(Boolean);
  })

  it('Simulate login', async () => {
    const res = await client.post('/login').send({
      username: 'JaredV',
      password: '123soleado'
    }).expect(200);
    expect(res.body).to.containEql(Object);
  })

  it('Get user for id', async () => {
    const res = await client.get('/users/2').expect(200);
    expect(res.body).to.containEql(Object);
  })
});
