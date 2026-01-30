import express from 'express'
const router = express.Router();
import { authenticate } from '../middlewares/auth.middleware.js';

import userController from '../controllers/user.controller.js'

router.post('/signup', userController.signUp);

router.post('/login', userController.login);

// router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id',authenticate, userController.getUserById);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);


export default router;