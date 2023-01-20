import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {
  clientRouter,
  managementRouter,
  salesRouter,
  generalRouter,
} from './routes/index';
import config from './config';

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
