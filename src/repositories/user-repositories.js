const { Op } = require('sequelize');
const { Users, Epresence } = require('../databases/models');

exports.findUser = () =>
 Users.findAll({
  where: {
   npp_supervisor: { [Op.not]: null },
  },
  include: Epresence,
 });

exports.findIdUser = (id) => Users.findByPk(id);

exports.findPropertyUser = (property, value) =>
 Users.findOne({
  where: {
   [property]: value,
  },
 });
