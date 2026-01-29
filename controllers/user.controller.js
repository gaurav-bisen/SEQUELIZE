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