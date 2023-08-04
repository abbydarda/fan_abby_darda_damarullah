const { JWT_EXP, JWT_SECRET } = require('../applications/config.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

exports.hashPassword = (password) => bcrypt.hashSync(password, 10);

exports.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

exports.jwtSign = (payload) => jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });

exports.jwtVerify = (token) => {
 try {
  return jsonwebtoken.verify(token, JWT_SECRET);
 } catch (error) {
  return null;
 }
};
