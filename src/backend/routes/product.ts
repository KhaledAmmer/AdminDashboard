import express = require('express');
import {
  allProducts,
  getDashboardStats,
  oneProduct,
} from '../controllers/product';

const router = express.Router();

/* GET METHODS */
router.get('/', allProducts);
router.get('/getDashboardStats', getDashboardStats);
router.get('/:id', oneProduct);

export default router;
