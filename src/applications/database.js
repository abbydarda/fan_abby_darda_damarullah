const { DB_DIALECT, DB_URI } = require('./config.js');

module.exports = {
 development: {
  url: DB_URI,
  dialect: DB_DIALECT,
 },
 testing: {
  url: DB_URI,
  dialect: DB_DIALECT,
 },
 production: {
  url: DB_URI,
  dialect: DB_DIALECT,
 },
};
