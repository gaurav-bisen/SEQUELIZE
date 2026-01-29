import express from 'express'
const router = express.Router();

import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/user.controller.js'

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);


export default router;