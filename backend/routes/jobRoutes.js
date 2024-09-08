// routes/jobRoutes.js
import express from 'express';
import { createJob, getAllJobs,matchJobs,applyForJob,getEmployeeApplications,getEmployerApplications,updateApplicationStatus } from '../controllers/JobController.js';

const router = express.Router();

// Create a job posting
router.post('/createjobs', createJob);
router.post('/apply', applyForJob);
router.get('/getjobs', getAllJobs);
router.get('/match/:employeeId', matchJobs);
router.get('/:employeeId', getEmployeeApplications);
router.get('/employer/:employerId', getEmployerApplications);
router.put('/:applicationId/status', updateApplicationStatus);


export default router;
