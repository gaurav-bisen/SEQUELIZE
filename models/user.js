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
      // user => profile relation 
      User.hasOne(models.admin, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
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
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  
  }, {
    sequelize,
    modelName: 'User',
    //to set timestamp default
    timestamps: true  //by this automatically update created_at updated_at
  });
  return User;
};