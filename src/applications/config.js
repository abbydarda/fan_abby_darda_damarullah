const dotenv = require('dotenv');
const path = require('path');

const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: path.resolve(envFilePath) });

module.exports = {
 APP_PORT: process.env.APP_PORT,
 DB_URI: process.env.DB_URI,
 DB_DIALECT: process.env.DB_DIALECT,
 NODE_ENV: process.env.NODE_ENV,
 JWT_SECRET: process.env.JWT_SECRET,
 JWT_EXP: process.env.JWT_EXP,
};
