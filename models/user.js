'use strict';
const {
  Model
} = require('sequelize');
const Todos = require('./todo');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'user_id', // The foreign key in the Todo model
        as: 'todos', // Alias for the association
      });
    }
  }
  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull : false
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};