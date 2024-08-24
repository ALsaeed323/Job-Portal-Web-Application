import express from 'express';
import { signupEmployer, signinEmployer } from '../controllers/employerController.js';
import { validateSignup, validateSignin } from '../middleware/employerValidator.js';

const router = express.Router();

router.post('/signup', validateSignup, signupEmployer);
router.post('/signin', validateSignin, signinEmployer);

export default router;
