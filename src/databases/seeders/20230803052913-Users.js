'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
   'Users',
   [
    {
     nama: 'Ananda Bayu',
     email: 'bayu@email.com',
     npp: '12345',
     npp_supervisor: '11111',
     password: hashPassword('password'),
    },
    {
     nama: 'Supervisor',
     email: 'spv@email.com',
     npp: '11111',
     npp_supervisor: null,
     password: hashPassword('password'),
    },
    {
     nama: 'Supervisor 1',
     email: 'spv1@email.com',
     npp: '22222',
     npp_supervisor: null,
     password: hashPassword('password'),
    },
   ],
   {},
  );
 },

 async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true });
 },
};
