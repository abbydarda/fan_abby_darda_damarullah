const logger = require('../applications/logger');
const { ResponseError } = require('../errors/response-errors');

exports.errorMiddleware = (err, req, res, next) => {
 if (!err) {
  next();
  return;
 }

 if (err instanceof ResponseError) {
  return res.status(err.status).json({ errors: err.message });
 }

 logger.error(err);
 return res.status(500).json({ errors: 'Mohon maaf, terjadi kesalahan pada server' });
};
