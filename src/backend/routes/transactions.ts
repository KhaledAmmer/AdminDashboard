import express = require('express');
import { allTransactions } from '../controllers/transactions';

const router = express.Router();

/* GET METHODS */
router.get('/', allTransactions);

export default router;
