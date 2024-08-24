import express from 'express';
import { signupEmployee,signinEmployee } from '../controllers/employeeController.js';
import {employeeSignupValidation} from '../middleware/employeeValidator.js';

const router = express.Router();

// Route for employee signup
router.post('/signup',employeeSignupValidation, signupEmployee);
router.post('/signin', signinEmployee);

export default router;
