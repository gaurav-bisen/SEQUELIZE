import db from '../models/index.js'
const { User } = db;
import { handleResponse } from '../utils/handleResponse.util.js';

export const createUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            where: { email: req.body.email }
          });
      
          if (existingUser) {
            return handleResponse(res, {
              status: 409,
              message: 'User already exists'
            });
          }
        const user = await User.create(req.body);

        handleResponse(res, {
            status: 201, 
            message: "User Created SuccessFully!", 
            data: user});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});
    if(!users){
      return handleResponse(res, {
        status: 400,
        message: '0 users exists'
      });
    }

    handleResponse(res, {
      status: 200, 
      message: "All Users fetched SuccessFully!", 
      data: users});

  } catch (error) {
    next(error);
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {id},
      //to get specific field from db (dont use this if want all columns from db)
      attributes: ['id', 'name', 'email']
    });
    
    if(!user){
      return handleResponse(res, {
        status: 400,
        message: 'User Not exists'
      });
    }

    handleResponse(res, {
      status: 200, 
      message: "User fetched SuccessFully!", 
      data: user});

  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    //hard delete
    const { id } = req.params;

    const user = await User.destroy({
      where: {id},
      
      //force: true //to hard delete
    });
    
    if(!user){
      return handleResponse(res, {
        status: 400,
        message: 'User Not exists'
      });
    }

    handleResponse(res, {
      status: 200, 
      message: "User deleted SuccessFully!", 
      data: user});
    
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      if(!id){
        return handleResponse(res, {
          status: 400,
          message: 'User Not Exists'
        });
      }

      const user = await User.findByPk(id);

      if(!user){
        return handleResponse(res, {
          status: 404,
          message: 'User Not Found'
        });
      }

      await user.update(req.body) //user update which is find by pk

      handleResponse(res, {
        status: 200, 
        message: "User Updated SuccessFully!", 
        data: user});

    } catch (error) {
      next(error);
    }
}