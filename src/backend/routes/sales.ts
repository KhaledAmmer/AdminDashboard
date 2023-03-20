import { getSales } from 'controllers/sales';
import express from 'express';

const salesRouter = express.Router();

salesRouter.get('/', getSales);
export default salesRouter;
