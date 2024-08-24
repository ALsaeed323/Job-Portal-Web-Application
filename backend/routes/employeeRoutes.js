import express from 'express';
import { signupEmployee } from '../controllers/employeeController.js';

const router = express.Router();

// Route for employee signup
router.post('/signup', signupEmployee);

export default router;
