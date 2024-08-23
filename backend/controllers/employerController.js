import bcrypt from 'bcrypt';
import Employer from '../models/employerModel.js';

export const signupEmployer = async (req, res) => {
  try {
    const { companyName, companyDescription, specialties, phoneNumber, email, address, password } = req.body;

    // Check if employer already exists
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: 'Employer with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new Employer({
      companyName,
      companyDescription,
      specialties,
      phoneNumber,
      email,
      address,
      password: hashedPassword, // Store the hashed password
    });

    await newEmployer.save();
    res.status(201).json({ message: 'Employer signed up successfully!', employer: newEmployer });
  } catch (error) {
    console.error('Error signing up employer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const signinEmployer = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the employer exists
      const employer = await Employer.findOne({ email });
      if (!employer) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, employer.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If credentials are valid, respond with success
      res.status(200).json({ message: 'Sign in successful', employer });
    } catch (error) {
      console.error('Error signing in employer:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
