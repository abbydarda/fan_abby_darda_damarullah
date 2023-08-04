const { ResponseError } = require('../errors/response-errors');
const { jwtVerify } = require('../utils/auth-utils');

exports.isAuthorized = (req, res, next) => {
 const authorizationHeader = req.header('authorization');

 if (!authorizationHeader) throw new ResponseError(401, 'Tidak punya akses');

 const [schema, token] = authorizationHeader.split(' ');

 const verifyToken = jwtVerify(token);

 if (schema !== 'Bearer' || !verifyToken) throw new ResponseError(401, 'Token tidak valid');

 req.user = {
  ...verifyToken,
 };

 next();
};

exports.isSupervisor = (req, res, next) => {
 const { user } = req;

 if (user.supervisor) throw new ResponseError(403, 'Tidak punya akses');

 next();
};
