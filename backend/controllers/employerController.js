import bcrypt from 'bcrypt';
import Employer from '../models/employerModel.js';
import Session from '../models/employerSesstionModel.js'; 
import generateSessionToken from '../utils/gsesstion.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

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

    // Check if there's an active session for the employer
    const activeSession = await Session.findOne({
      userId: employer._id,
      status: "active",
    });

    if (activeSession) {
      return res.status(400).json({ message: "An active session already exists" });
    }

    // Check if there's an inactive session and reactivate it
    let session = await Session.findOne({
      userId: employer._id,
      status: "inactive",
    });

    if (session) {
      session.status = "active";
      session.lastAccess = new Date();
      await session.save();
    } else {
      // Generate a JWT session token instead of a random session ID
      const sessionId = generateSessionToken({ 
        userId: employer._id, 
        role: 'employer' 
      }, JWT_SECRET, { expiresIn: '1h' });  // Adjust expiration as needed

      // Create a new session in the database
      session = new Session({
        userId: employer._id,
        sessionId,
        status: 'active',
        createdAt: new Date(),
      });

      await session.save();
    }
   

    // Respond with success and the JWT token
    res.status(200).json({ 
      message: 'Sign in successful', 
      employer, 
      sessionToken: session.sessionId  // JWT token is returned as sessionToken
    });
  } catch (error) {
    console.error('Error signing in employer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const logout = async (req, res) => {
  try {
    const { sessionToken } = req.body;
    
    if (!sessionToken) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await Session.findOneAndUpdate(
      {sessionId: sessionToken },
      { status: "inactive", lastAccess: new Date() },
      { new: true }
    );

    if (!session) {
      console.log('Session not found for token:', sessionToken);
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: "Server error", error });
  }
};
