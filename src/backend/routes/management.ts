import express = require('express');
import { allAdmins, getUserPerformance } from '../controllers/management';

const router = express.Router();

router.get('/admins', allAdmins);
router.get('/performance/:id', getUserPerformance);

export default router;
