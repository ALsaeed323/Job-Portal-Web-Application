import express from 'express';
import { signupEmployer, signinEmployer,logout } from '../controllers/employerController.js';
import { validateSignup, validateSignin } from '../middleware/employerValidator.js';

const router = express.Router();

router.post('/signup', validateSignup, signupEmployer);
router.post('/signin', validateSignin, signinEmployer);
router.post('/logout', logout);

export default router;
