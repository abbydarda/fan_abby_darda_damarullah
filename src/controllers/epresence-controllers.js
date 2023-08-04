const { approvedEpresenceService, insertEpresenceService } = require('../services/epresence-services');

exports.insertEpresenceController = async (req, res, next) => {
 try {
  const { user, body } = req;

  const result = await insertEpresenceService(user.sub, body);

  const response = {
   message: 'Berhasil menambahkan data',
   data: result,
  };

  res.status(201).json(response);
 } catch (error) {
  next(error);
 }
};

exports.approvedEpresenceController = async (req, res, next) => {
 try {
  const { user } = req;
  const { idEpresence } = req.params;

  const result = await approvedEpresenceService(idEpresence, user.npp);

  const response = {
   message: 'Berhasil mengubah data',
   data: result,
  };

  res.status(200).json(response);
 } catch (error) {
  next(error);
 }
};
