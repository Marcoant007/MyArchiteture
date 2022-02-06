import supertest from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import App from "../src/shared/infra/http/app";

beforeAll(async () => {
  global.testRequest = supertest(App);
  await createConnection();
});

afterAll(async () => {
  await getConnection().close()
})
