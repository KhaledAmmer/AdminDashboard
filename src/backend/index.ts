import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import cors = require('cors');
import mongoose from 'mongoose';
import helmet from 'helmet';
import {
  productRouter,
  managementRouter,
  salesRouter,
  generalRouter,
  transactionRouter as transactionsRouter,
} from './routes/index';
import config from './config';
import { globalErrorHandler } from './middlewares/errorHandler';
import Transactions from './models/Transactions';
import { dataTransaction } from './data';
/* import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

import { dataTransaction } from './data';
// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
}); */
/* 
*! insert those once
import { dataProduct, dataProductStat, dataUser } from './data';
import Product from './models/Product';
import ProductStat from './models/ProductStat';
import User from './models/User';\
*/

/* CONFIGURATION */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Routes */
app.use('/products', productRouter);
app.use('/management', managementRouter);
app.use('/sales', salesRouter);
app.use('/general', generalRouter);
app.use('/transactions', transactionsRouter);

app.use(globalErrorHandler);

/* MONGOOSE */
mongoose.set('strictQuery', false);
const PORT = config.PORT || 5000;
mongoose.connect(config.MONGODB_CONNECTION_STRING, (error) => {
  if (error) {
    console.log('Error connecting to MongoDB', error);
    return;
  }

  /* 
   ! insert those once 
  User.insertMany(dataUser)
  Product.insertMany(dataProduct);
  ProductStat.insertMany(dataProductStat);
  Transactions.insertMany(dataTransaction);
  */

  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
