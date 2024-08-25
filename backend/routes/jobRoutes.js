// routes/jobRoutes.js
import express from 'express';
import { createJob, getAllJobs } from '../controllers/JobController.js';

const router = express.Router();

// Create a job posting
router.post('/createjobs', createJob);

// Get all job postings
router.get('/getjobs', getAllJobs);


export default router;
