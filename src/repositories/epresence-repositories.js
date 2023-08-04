const { Epresence } = require('../databases/models/');

exports.findOnePropertyEpresence = async (property, value) =>
 Epresence.findOne({
  where: {
   [property]: value,
  },
 });

exports.findIdEpresence = (id) => Epresence.findByPk(id);

exports.insertEpresence = (payload) => Epresence.create(payload);

exports.updateEpresence = (id, payload) => Epresence.update(payload, { where: { id } });
