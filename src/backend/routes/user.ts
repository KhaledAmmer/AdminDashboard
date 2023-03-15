import express = require('express');
import { getUser , allCustomers} from '../controllers/user';

const router = express.Router();

/* GET METHODS */
router.get('/:id', getUser);
router.get('/customers/all', allCustomers);

export default router;
