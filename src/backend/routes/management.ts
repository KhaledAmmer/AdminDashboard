import { allAdmins, getUserPerformance } from 'controllers/management';
import express from 'express';


const managementRouter = express.Router();

managementRouter.get('/admins', allAdmins);
managementRouter.get('/performance/:id', getUserPerformance);

export default managementRouter;
