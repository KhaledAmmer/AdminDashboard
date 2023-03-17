import * as express  from 'express';
import { allProducts, getDashboardStats, oneProduct } from '../controllers/product';


const productsRouter = express.Router();

/* GET METHODS */
productsRouter.get('/', allProducts);
productsRouter.get('/getDashboardStats', getDashboardStats);
productsRouter.get('/:id', oneProduct);

export default productsRouter;
