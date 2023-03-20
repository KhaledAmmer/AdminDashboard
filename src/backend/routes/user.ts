import { allCustomers, getUser, usersGeography } from '../controllers/user';
import express from 'express';

const userRouter = express.Router();

/* GET METHODS */
userRouter.get('/geography', usersGeography);
userRouter.get('/customers', allCustomers);
userRouter.get('/:id', getUser);

export default userRouter;
