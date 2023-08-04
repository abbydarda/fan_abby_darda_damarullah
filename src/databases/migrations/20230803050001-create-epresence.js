'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Epresence', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   id_users: {
    type: Sequelize.INTEGER,
    references: {
     model: 'Users',
     key: 'id',
    },
   },
   type: {
    type: Sequelize.ENUM,
    values: ['IN', 'OUT'],
   },
   is_approve: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
   },
   waktu: {
    type: Sequelize.STRING,
   },
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Epresence');
 },
};
