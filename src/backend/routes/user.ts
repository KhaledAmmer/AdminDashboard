import express from 'express';
import { getUser, allCustomers, usersGeography } from '../controllers/user';

const userRouter = express.Router();

/* GET METHODS */
userRouter.get('/geography', usersGeography);
userRouter.get('/customers', allCustomers);
userRouter.get('/:id', getUser);

export default userRouter;
