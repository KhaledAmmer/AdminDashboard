import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {
  clientRouter,
  managementRouter,
  salesRouter,
  generalRouter,
} from './routes/index';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* DATABASE */

/* Routes */
//client management sales general Routes
app.use("/client", clientRouter);
app.use("/management", managementRouter);
app.use("/sales", salesRouter);
app.use("/general", generalRouter);
