'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   nama: {
    type: Sequelize.STRING,
   },
   email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
     isEmail: true,
    },
   },
   npp: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
   },
   npp_supervisor: {
    type: Sequelize.STRING,
   },
   password: {
    type: Sequelize.STRING,
    allowNull: false,
   },
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users');
 },
};
