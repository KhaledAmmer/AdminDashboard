import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import cors = require('cors');
import mongoose from 'mongoose';
import helmet from 'helmet';
import {
  clientRouter,
  managementRouter,
  salesRouter,
  generalRouter,
} from './routes/index';
import config from './config';

import User from './models/User';

import { dataUser } from './data';

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
app.use('/client', clientRouter);
app.use('/management', managementRouter);
app.use('/sales', salesRouter);
app.use('/general', generalRouter);

/* MONGOOSE */
mongoose.set('strictQuery', false);
const PORT = config.PORT || 5000;
mongoose.connect(config.MONGODB_CONNECTION_STRING, (error) => {
  if (error) {
    console.log('Error connecting to MongoDB', error);
    return;
  }
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
