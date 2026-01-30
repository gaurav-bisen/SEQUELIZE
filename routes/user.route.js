import express from 'express'
const router = express.Router();

import userController from '../controllers/user.controller.js'

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);


export default router;