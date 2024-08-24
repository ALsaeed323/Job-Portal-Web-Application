import express from 'express';
import { signupEmployee } from '../controllers/employeeController.js';
import {employeeSignupValidation} from '../middleware/employeeValidator.js';

const router = express.Router();

// Route for employee signup
router.post('/signup',employeeSignupValidation, signupEmployee);

export default router;
