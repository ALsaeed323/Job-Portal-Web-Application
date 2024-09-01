import express from 'express';
import { completeEmployerProfile, signupEmployerInitial,signinEmployer,logout } from '../controllers/employerController.js';
import { validateSignup, validateSignin } from '../middleware/employerValidator.js';

const router = express.Router();

router.post('/signup-initial', signupEmployerInitial);
router.post('/complete-profile', completeEmployerProfile);
router.post('/signin', validateSignin, signinEmployer);
router.post('/logout', logout);

export default router;
