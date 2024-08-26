// routes/jobRoutes.js
import express from 'express';
import { createJob, getAllJobs,matchJobs,applyForJob,getEmployeeApplications } from '../controllers/JobController.js';

const router = express.Router();

// Create a job posting
router.post('/createjobs', createJob);

// Get all job postings
router.get('/getjobs', getAllJobs);
router.get('/match/:employeeId', matchJobs);
router.post('/apply', applyForJob);
router.get('/:employeeId', getEmployeeApplications);


export default router;
