import {ApplicationConfig, PockettherapyappApplication} from './application';

export * from './application';
const path = require('path');
const multer = require('multer');
export async function main(options: ApplicationConfig = {}) {
  const app = new PockettherapyappApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  multer({
    dest: path.join(__dirname, 'public/uploads-photos')
  })

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
