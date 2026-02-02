import express from 'express'
const router = express.Router();
import { authenticate } from '../middlewares/auth.middleware.js';

import userController from '../controllers/user.controller.js'

router.post('/signup', userController.signUp);

router.get('/verify_email', userController.verifyEmail)

router.post('/login', userController.login);

router.post('/forget_password', userController.forgetPassword);

router.post('/reset_password', userController.resetPassword);


router.post('/currentuser', authenticate, userController.loggedInUser);

// router.post('/', userController.createUser);

router.get('/', authenticate, userController.getAllUsers);

router.get('/:id', authenticate, userController.getUserById);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);


export default router;