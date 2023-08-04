'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
   'Epresence',
   [
    {
     id_users: 1,
     type: 'IN',
     is_approve: 'TRUE',
     waktu: '16/10/20 08.00',
    },
    {
     id_users: 1,
     type: 'OUT',
     is_approve: 'FALSE',
     waktu: '16/10/20 17.00',
    },
   ],
   {},
  );
 },

 async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Epresence', null, { truncate: true, cascade: true });
 },
};
