import express from 'express'
const router = express();

import { createUser } from '../controllers/user.controller.js'

router.post('/', createUser);

export default router;