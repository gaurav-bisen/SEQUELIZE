import express from 'express'
const router = express.Router();
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateAJV } from '../middlewares/ajv.middleware.js'
import userSchema from '../schema/user.schema.js'

import userController from '../controllers/user.controller.js'

router.post('/signup', validateAJV(userSchema), userController.signUp);

router.get('/verify_email', userController.verifyEmail)

router.post('/login', validateAJV(userSchema), userController.login);

router.post('/forget_password', validateAJV(userSchema), userController.forgetPassword);

router.post('/reset_password', validateAJV(userSchema), userController.resetPassword);


router.post('/currentuser', authenticate, userController.loggedInUser);

// router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', authenticate, userController.getUserById);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);


export default router;