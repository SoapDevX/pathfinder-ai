import express from 'express';
import { matchJobs, searchJobs, getSavedJobs } from '../controllers/jobController';

const router = express.Router();

router.post('/match', matchJobs);
router.get('/search', searchJobs);
router.get('/saved', getSavedJobs);

export default router;