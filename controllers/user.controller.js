import userService from '../services/user/user.service.js'
import signupService from '../services/user/signup.service.js'
import authService from '../services/user/auth.service.js'
import loggedInUserService from '../services/user/loggedInUser.service.js';
import { handleResponse } from '../utils/handleResponse.util.js';

class UserController {
  async signUp(req, res, next) {
    try {
      const { name, email, status, password, role } = req.body;

      const user = await signupService.signup({ name, email, status, password, role });

      handleResponse(res, {
        status: 201,
        message: "User Signup SuccessFully!",
        data: user
      });

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token, user } = await authService.login({ email, password })

      handleResponse(res, {
        status: 201,
        message: "User Login SuccessFully!",
        data: {
          token: token,
          user
        }
      });

    } catch (error) {
      next(error);
    }
  }

  async loggedInUser(req, res, next) {
    try {
      const user = await loggedInUserService.loggedUser();

      handleResponse(res, {
        status: 200,
        message: "User fetched SuccessFully!",
        data: user
      });
    } catch (error) {
      next(error)
    }
  }

  // async createUser(req, res, next) {
  //   try {
  //     const user = await userService.createUser(req.body);

  //     handleResponse(res, {
  //       status: 201,
  //       message: "User Created SuccessFully!",
  //       data: user
  //     });

  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      handleResponse(res, {
        status: 200,
        message: "All Users fetched SuccessFully!",
        data: users
      });

    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      handleResponse(res, {
        status: 200,
        message: "User fetched SuccessFully!",
        data: user
      });

    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      //hard delete
      const { id } = req.params;
      const user = await userService.deleteUser(id);

      handleResponse(res, {
        status: 200,
        message: "User deleted SuccessFully!",
        data: user
      });

    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);

      handleResponse(res, {
        status: 200,
        message: "User Updated SuccessFully!",
        data: user
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();





// export const createUser = async (req, res, next) => {
//   try {
//     // const existingUser = await User.findOne({
//     //     where: { email: req.body.email }
//     //   });

//     //   if (existingUser) {
//     //     return handleResponse(res, {
//     //       status: 409,
//     //       message: 'User already exists'
//     //     });
//     //   }
//     // const user = await User.create(req.body);

//     const user = await userService.createUser(req.body);

//     handleResponse(res, {
//       status: 201,
//       message: "User Created SuccessFully!",
//       data: user
//     });

//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }

// export const getAllUsers = async (req, res, next) => {
//   try {
//     // const users = await User.findAll({});
//     // if(!users){
//     //   return handleResponse(res, {
//     //     status: 400,
//     //     message: '0 users exists'
//     //   });
//     // }

//     const users = await userService.getAllUsers();

//     handleResponse(res, {
//       status: 200,
//       message: "All Users fetched SuccessFully!",
//       data: users
//     });

//   } catch (error) {
//     next(error);
//   }
// }

// export const getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // const user = await User.findOne({
//     //   where: {id},
//     //   //to get specific field from db (dont use this if want all columns from db)
//     //   attributes: ['id', 'name', 'email']
//     // });

//     // if(!user){
//     //   return handleResponse(res, {
//     //     status: 400,
//     //     message: 'User Not exists'
//     //   });
//     // }

//     const user = await userService.getUserById(id);

//     handleResponse(res, {
//       status: 200,
//       message: "User fetched SuccessFully!",
//       data: user
//     });

//   } catch (error) {
//     next(error);
//   }
// }

// export const deleteUser = async (req, res, next) => {
//   try {
//     //hard delete
//     const { id } = req.params;

//     // const user = await User.destroy({
//     //   where: {id},

//     //   //force: true //to hard delete
//     // });

//     // if(!user){
//     //   return handleResponse(res, {
//     //     status: 400,
//     //     message: 'User Not exists'
//     //   });
//     // }
//     const user = await userService.deleteUser(id);

//     handleResponse(res, {
//       status: 200,
//       message: "User deleted SuccessFully!",
//       data: user
//     });

//   } catch (error) {
//     next(error)
//   }
// }

// export const updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // const user = await User.findByPk(id);

//     // if(user){
//     //   return handleResponse(res, {
//     //     status: 404,
//     //     message: 'User Not Found'
//     //   });
//     // }

//     // await user.update(req.body) //user update which is find by pk

//     const user = await userService.updateUser(id, req.body);

//     handleResponse(res, {
//       status: 200,
//       message: "User Updated SuccessFully!",
//       data: user
//     });

//   } catch (error) {
//     next(error);
//   }
// }