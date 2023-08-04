const { findUserService } = require('../services/user-services');

exports.findUserController = async (req, res, next) => {
 try {
  const result = await findUserService();

  const response = {
   message: 'Berhasil mengambil data',
   data: result,
  };

  res.status(200).json(response);
 } catch (error) {
  next(error);
 }
};
