import express from 'express';
import { saveCV,signupEmployeeInitial,completeEmployeeProfile,signinEmployee,logout } from '../controllers/employeeController.js';
import {employeeSignupValidation} from '../middleware/employeeValidator.js';
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

// Route for employee signup
router.post('/signup-initial', signupEmployeeInitial);
router.put('/complete-profile', completeEmployeeProfile);
router.post("/save", upload.single("pdfData"), saveCV);
router.post('/signin', signinEmployee);
router.post('/logout', logout);

export default router;
