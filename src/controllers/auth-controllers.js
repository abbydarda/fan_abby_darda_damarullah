const { authLoginService } = require('../services/auth-services');

exports.authLoginController = async (req, res, next) => {
 try {
  const request = req.body;

  const result = await authLoginService(request);

  const response = {
   message: 'Login berhasil',
   data: result,
  };

  res.status(200).json(response);
 } catch (error) {
  next(error);
 }
};
