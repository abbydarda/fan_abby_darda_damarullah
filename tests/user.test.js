const supertest = require('supertest');
const app = require('../src/applications/app');

const request = supertest(app);
const base_url = '/api/user';

const setup = require('./config/setup');
const teardown = require('./config/teardown');
let token;

beforeEach(async () => {
 const result = await request.post(`/api/auth/login`).send({
  email: 'bayu@email.com',
  password: 'password',
 });

 const { body } = result;
 const { data } = body;
 token = data.token;
});

beforeAll(() => {
 return setup();
});

afterAll(() => {
 return teardown();
});

describe(`${base_url}`, () => {
 test('[401] - Gagal mengambil data tidak punya akses', async () => {
  const result = await request.get(`${base_url}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Tidak punya akses');
 });

 test('[401] - Gagal mengambil data token tidak valid', async () => {
  const result = await request.get(`${base_url}`).set('Authorization', 'Bearer abcdefg');

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[401] - Gagal mengambil data schema token bukan bearer', async () => {
  const result = await request.get(`${base_url}`).set('Authorization', `basic ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[200] - Mengambil data berhasil', async () => {
  const result = await request.get(`${base_url}`).set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(200);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');

  const { message, data } = body;
  expect(typeof message).toBe('string');
  expect(Array.isArray(data)).toBe(true);

  if (data.length > 0) {
   data.forEach((item) => {
    expect(item).toHaveProperty('id_user');
    expect(item).toHaveProperty('nama_user');
    expect(item).toHaveProperty('tanggal');
    expect(item).toHaveProperty('waktu_masuk');
    expect(item).toHaveProperty('waktu_pulang');
    expect(item).toHaveProperty('status_masuk');
    expect(item).toHaveProperty('status_pulang');

    expect(typeof item.id_user).toBe('number');
    expect(typeof item.nama_user).toBe('string');
    expect(typeof item.tanggal).toBe('string');
    expect(typeof item.waktu_masuk).toBe('string');
    expect(typeof item.waktu_pulang).toBe('string');
    expect(typeof item.status_masuk).toBe('string');
    expect(typeof item.status_pulang).toBe('string');
   });
  }
 });
});
