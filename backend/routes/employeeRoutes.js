import express from 'express';
import { signupEmployee,signinEmployee,logout } from '../controllers/employeeController.js';
import {employeeSignupValidation} from '../middleware/employeeValidator.js';

const router = express.Router();

// Route for employee signup
router.post('/signup',employeeSignupValidation, signupEmployee);
router.post('/signin', signinEmployee);
router.post('/logout', logout);

export default router;
