import { allTransactions } from 'controllers/transactions';
import express from 'express';

const transactionsRouter = express.Router();

/* GET METHODS */
transactionsRouter.get('/', allTransactions);

export default transactionsRouter;
