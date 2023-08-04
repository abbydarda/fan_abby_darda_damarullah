const { authLoginValidation } = require('../validations/schema/auth-validations');
const { findPropertyUser } = require('../repositories/user-repositories');
const { jwtSign, comparePassword } = require('../utils/auth-utils');
const { validate } = require('../validations/validate');
const { ResponseError } = require('../errors/response-errors');

exports.authLoginService = async (request) => {
 request = validate(authLoginValidation, request);

 const { email, password } = request;

 const user = await findPropertyUser('email', email);

 if (!user || !comparePassword(password, user.password)) throw new ResponseError(401, 'Email atau password salah');

 const jwtPayload = {
  sub: user.id,
  npp: user.npp,
  supervisor: user.npp_supervisor,
 };

 const token = jwtSign(jwtPayload);

 return { token };
};
