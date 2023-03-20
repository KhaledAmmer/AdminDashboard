import { allProducts, getDashboardStats, oneProduct } from 'controllers/product';
import express from 'express';


const productsRouter = express.Router();

/* GET METHODS */
productsRouter.get('/', allProducts);
productsRouter.get('/getDashboardStats', getDashboardStats);
productsRouter.get('/:id', oneProduct);

export default productsRouter;
