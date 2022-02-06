import supertest from 'supertest';
import { createConnection, getConnection } from 'typeorm';

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close()
})
