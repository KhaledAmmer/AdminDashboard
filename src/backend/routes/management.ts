import  express from 'express';
import { allAdmins, getUserPerformance } from '../controllers/management';

const managementRouter = express.Router();

managementRouter.get('/admins', allAdmins);
managementRouter.get('/performance/:id', getUserPerformance);

export default managementRouter;
