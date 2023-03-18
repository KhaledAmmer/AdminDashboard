import express from 'express';
import { allTransactions } from '../controllers/transactions';

const transactionsRouter = express.Router();

/* GET METHODS */
transactionsRouter.get('/', allTransactions);

export default transactionsRouter;
