import express from 'express';
import bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import productRouter from './routes/product';
import managementRouter from './routes/management';
import salesRouter from './routes/sales';
import userRouter from './routes/user';
import transactionsRouter from './routes/transactions';

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
/* app.use('/user', userRouter);
app.use('/sales', salesRouter);
app.use('/products', productRouter);
app.use('/management', managementRouter);
app.use('/transactions', transactionsRouter); */

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
  !!! insert those once 
  User.insertMany(dataUser)
  Product.insertMany(dataProduct);
  ProductStat.insertMany(dataProductStat);
  Transactions.insertMany(dataTransaction);
  OverAllStat.insertMany(dataOverallStat);
  AffiliateStat.insertMany(dataAffiliateStat);
  */

  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
