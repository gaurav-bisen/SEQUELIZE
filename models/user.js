'use strict';
import {
  Model
} from 'sequelize'; //model from sequelize
export default (sequelize, DataTypes) => {
  class User extends Model { //extends model class
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here(relationships)
    }
  }
  User.init({
    // name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // status: DataTypes.STRING
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required!' },
        notEmpty: { msg: 'Name cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required!' },
        notEmpty: { msg: 'Email cannot be empty' },
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required!' },
        notEmpty: { msg: 'Password cannot be empty' },
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'User',
    //to set timestamp default
    timestamps: true,  //by this automatically update created_at updated_at
    paranoid: true, //for soft delete
    underscored: true //map camelcase field in migration
  });
  return User;
};