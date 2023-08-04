const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Users extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Users.hasMany(models.Epresence, { foreignKey: 'id_users' });
  }
 }
 Users.init(
  {
   nama: DataTypes.STRING,
   email: DataTypes.STRING,
   npp: DataTypes.STRING,
   npp_supervisor: DataTypes.STRING,
   password: DataTypes.STRING,
  },
  {
   sequelize,
   underscored: true,
   timestamps: false,
   tableName: 'Users',
   modelName: 'Users',
  },
 );
 return Users;
};
