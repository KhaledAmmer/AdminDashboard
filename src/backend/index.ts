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
  userRouter,
  transactionRouter as transactionsRouter,
} from './routes/index';
import config from './config';
import { globalErrorHandler } from './middlewares/errorHandler';

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
app.use('/user', userRouter);
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
  OverAllStat.insertMany(dataOverallStat);
  */

  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
