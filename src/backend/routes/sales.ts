import * as express  from 'express';
import { getSales } from '../controllers/sales';

const salesRouter = express.Router();

salesRouter.get('/', getSales);
export default salesRouter;
