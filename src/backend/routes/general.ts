import express = require('express');
import { getUser } from '../controllers/general';
import 'express-async-errors';

const router = express.Router();

/* GET METHODS */
router.get('/user/:id', getUser);

export default router;
