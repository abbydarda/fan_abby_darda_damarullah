const supertest = require('supertest');
const app = require('../src/applications/app');
const { jwtVerify } = require('../src/utils/auth-utils');

const request = supertest(app);
const base_url = '/api/epresence';

const setup = require('./config/setup');
const teardown = require('./config/teardown');
const logger = require('../src/applications/logger');

let token;
let tokenSpv;
let tokenSPv1;
beforeEach(async () => {
 const result = await request.post(`/api/auth/login`).send({
  email: 'bayu@email.com',
  password: 'password',
 });

 const resultSpv = await request.post(`/api/auth/login`).send({
  email: 'spv@email.com',
  password: 'password',
 });

 const resultSpv1 = await request.post(`/api/auth/login`).send({
  email: 'spv1@email.com',
  password: 'password',
 });

 token = result.body.data.token;
 tokenSpv = resultSpv.body.data.token;
 tokenSpv1 = resultSpv1.body.data.token;
 return true;
});

beforeAll(() => {
 return setup();
});

afterAll(() => {
 return teardown();
});

describe(`${base_url}`, () => {
 test('[400] - Tambah epresence tanpa mengirim payload', async () => {
  const result = await request.post(`${base_url}`).set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type harus diisi');
 });

 test('[400] - Tambah epresence tanpa mengirim type', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type harus diisi');
 });

 test('[400] - Tambah epresence mengirim type bukan IN atau OUT', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'MASUK',
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence mengirim type number', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 1,
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence mengirim type boolean', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: true,
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence mengirim type array', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: [],
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence mengirim type object', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: {},
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence mengirim type kosong', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: '',
    waktu: '2020-10-16 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Type hanya boleh IN|OUT');
 });

 test('[400] - Tambah epresence tanpa mengirim waktu', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Waktu harus diisi');
 });

 test('[400] - Tambah epresence mengirim waktu kosong', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: '',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Waktu tidak boleh kosong');
 });

 test('[400] - Tambah epresence mengirim waktu format salah', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: 'asdf',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Format waktu tidak valid (YYYY-MM-DD HH:mm:ss)');
 });

 test('[400] - Tambah epresence mengirim waktu', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: '2020-16-10',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Format waktu tidak valid (YYYY-MM-DD HH:mm:ss)');
 });

 test('[400] - Tambah epresence mengirim waktu', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: '2020-16-10',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;

  expect(typeof errors).toBe('string');
  expect(errors).toBe('Format waktu tidak valid (YYYY-MM-DD HH:mm:ss)');
 });

 test('[401] - Gagal menambah data tidak punya akses', async () => {
  const result = await request.post(`${base_url}`).send({
   type: 'IN',
   waktu: '2020-16-10',
  });

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Tidak punya akses');
 });

 test('[401] - Gagal menambah data token tidak valid', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: '2020-16-10',
   })
   .set('Authorization', 'Bearer abcdefg');

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[401] - Gagal menambah data schema token bukan bearer', async () => {
  const result = await request.post(`${base_url}`).set('Authorization', `basic ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[201] - Tambah epresence berhasil', async () => {
  const result = await request
   .post(`${base_url}`)
   .send({
    type: 'IN',
    waktu: '2020-16-10 08:00:00',
   })
   .set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(201);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');

  const { message, data } = body;

  expect(typeof message).toBe('string');
  expect(typeof data).toBe('object');
  const { id } = data;
  expect(typeof id).toBe('number');
 });
});

describe(`${base_url}/approve/:idEpresence`, () => {
 test('[401] - Gagal mengubah data tidak punya akses', async () => {
  const result = await request.put(`${base_url}/approve/3`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Tidak punya akses');
 });

 test('[401] - Gagal mengubah data token tidak valid', async () => {
  const result = await request.put(`${base_url}/approve/3`).set('Authorization', 'Bearer abcdefg');

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[401] - Gagal mengubah data schema token bukan bearer', async () => {
  const result = await request.put(`${base_url}/approve/3`).set('Authorization', `basic ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Token tidak valid');
 });

 test('[403] - Approve epresence gagal bukan supervisor', async () => {
  const result = await request.put(`${base_url}/approve/3`).set('Authorization', `Bearer ${token}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(403);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Tidak punya akses');
 });

 test('[403] - Approve epresence gagal bukan supervisor dari pegawai', async () => {
  const result = await request.put(`${base_url}/approve/3`).set('Authorization', `Bearer ${tokenSpv1}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(403);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Tidak punya akses');
 });

 test('[404] - Approve epresence gagal epresence tidak ditemukan', async () => {
  const result = await request.put(`${base_url}/approve/4`).set('Authorization', `Bearer ${tokenSpv}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(404);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Data tidak ditemukan');
 });

 test('[200] - Approve epresence berhasil', async () => {
  const result = await request.put(`${base_url}/approve/3`).set('Authorization', `Bearer ${tokenSpv}`);

  const { statusCode, body } = result;

  expect(statusCode).toBe(200);
  expect(typeof body).toBe('object');
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');

  const { message, data } = body;

  expect(typeof message).toBe('string');
  expect(typeof data).toBe('object');
  const { id } = data;
  expect(typeof id).toBe('number');
 });
});
