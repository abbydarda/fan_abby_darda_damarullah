const supertest = require('supertest');
const app = require('../src/applications/app');
const { jwtVerify } = require('../src/utils/auth-utils');
const logger = require('../src/applications/logger');
const setup = require('./config/setup');
const teardown = require('./config/teardown');

const request = supertest(app);
const base_url = '/api/auth';

function generateRandomCharacters(minLength) {
 const allCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
 let randomCharacters = '';

 for (let i = 0; i < minLength; i++) {
  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  randomCharacters += allCharacters.charAt(randomIndex);
 }

 return randomCharacters;
}

beforeAll(() => {
 return setup();
});

afterAll(() => {
 return teardown();
});

describe(`${base_url}/login`, () => {
 test('[400] - Login tanpa mengirim payload request', async () => {
  const result = await request.post(`${base_url}/login`);
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus diisi');
 });

 test('[400] - Login tanpa mengirim email', async () => {
  const result = await request.post(`${base_url}/login`).send({
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus diisi');
 });

 test('[400] - Login mengirim email dengan format number', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 1,
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus berupa string');
 });

 test('[400] - Login mengirim email dengan format boolean', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: true,
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus berupa string');
 });

 test('[400] - Login mengirim email dengan format array', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: [],
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus berupa string');
 });

 test('[400] - Login mengirim email dengan format object', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: {},
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email harus berupa string');
 });

 test('[400] - Login mengirim email kosong', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: ``,
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Email tidak boleh kosong');
 });

 test('[400] - Login mengirim email format tidak valid', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: `test@test`,
   password: 'password',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Format email tidak valid');
 });

 test('[400] - Login tanpa mengirim password', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password harus diisi');
 });

 test('[400] - Login mengirim password dengan format number', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: 1,
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password harus berupa string');
 });

 test('[400] - Login mengirim password dengan format boolean', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: true,
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password harus berupa string');
 });

 test('[400] - Login mengirim password dengan format array', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: [],
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password harus berupa string');
 });

 test('[400] - Login mengirim password dengan format object', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: {},
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password harus berupa string');
 });

 test('[400] - Login mengirim password kosong', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: '',
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password tidak boleh kosong');
 });

 test('[400] - Login mengirim password dengan karakter kurang dari 8', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: `test@test.com`,
   password: generateRandomCharacters(6),
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password minimal terdiri dari 8 karakter');
 });

 test('[400] - Login mengirim password dengan karakter lebih dari 100', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: `test@test.com`,
   password: generateRandomCharacters(101),
  });
  const { statusCode, body } = result;

  expect(statusCode).toBe(400);
  expect(body).toHaveProperty('errors');
  const { errors } = body;
  expect(typeof errors).toBe('string');
  expect(errors).toBe('Password maksimal terdiri dari 100 karakter');
 });

 test('[401] - Login Gagal email salah', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'test@test.com',
   password: 'password',
  });

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(errors).toBe('Email atau password salah');
 });

 test('[401] - Login Gagal password salah', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'bayu@email.com',
   password: generateRandomCharacters(10),
  });

  const { statusCode, body } = result;

  expect(statusCode).toBe(401);
  expect(body).toHaveProperty('errors');

  const { errors } = body;
  expect(errors).toBe('Email atau password salah');
 });

 test('[200] - Login berhasil', async () => {
  const result = await request.post(`${base_url}/login`).send({
   email: 'bayu@email.com',
   password: 'password',
  });

  const { statusCode, body } = result;

  expect(statusCode).toBe(200);
  expect(body).toHaveProperty('message');
  expect(body).toHaveProperty('data');

  const { message, data } = body;
  expect(typeof message).toBe('string');
  expect(typeof data).toBe('object');
  expect(data).toHaveProperty('token');

  const { token } = data;
  expect(typeof token).toBe('string');
  expect(typeof jwtVerify(token)).toBe('object');
 });
});
