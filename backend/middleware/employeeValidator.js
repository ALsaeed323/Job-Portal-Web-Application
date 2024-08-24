import { body, validationResult } from 'express-validator';

// Validation rules for employee signup
export const employeeSignupValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('skills').isArray().withMessage('Skills should be an array'),
  body('experiences').isArray().withMessage('Experiences should be an array'),
  body('education').isArray().withMessage('Education should be an array'),
  // Add more validations as needed
];

// Middleware to check validation result
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
