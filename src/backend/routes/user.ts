import express = require('express');
import { getUser, allCustomers, usersGeography } from '../controllers/user';

const router = express.Router();

/* GET METHODS */
router.get('/geography', usersGeography);
router.get('/customers', allCustomers);
router.get('/:id', getUser);

export default router;
