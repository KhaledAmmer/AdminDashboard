import express = require('express');
import { allProducts, oneProduct } from '../controllers/product';

const router = express.Router();

/* GET METHODS */
router.get('/', allProducts);
router.get('/:id', oneProduct);


export default router;
