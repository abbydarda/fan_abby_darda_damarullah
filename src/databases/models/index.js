'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { NODE_ENV } = require('../../applications/config');
const basename = path.basename(__filename);
const env = NODE_ENV || 'development';
const config = require(__dirname + '/../../applications/database.js')[env];
const db = {};

let sequelize;

if (config) {
 sequelize = new Sequelize(config.url);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
 .readdirSync(__dirname)
 .filter((file) => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
 })
 .forEach((file) => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
 });

Object.keys(db).forEach((modelName) => {
 if (db[modelName].associate) {
  db[modelName].associate(db);
 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
