import express from 'express';
import { signupEmployer, signinEmployer } from '../controllers/employerController.js';

const router = express.Router();

router.post('/signup', signupEmployer);
router.post('/signin', signinEmployer);  // New route for sign-in

export default router;
