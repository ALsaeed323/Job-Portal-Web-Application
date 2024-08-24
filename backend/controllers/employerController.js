import bcrypt from 'bcrypt';
import Employer from '../models/employerModel.js';
import Session from '../models/employerSesstionModel.js'; 
import generateSessionId from '../utils/gsesstion.js'; 

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
      // Generate a session ID
      const sessionId = generateSessionId();

      // Create a new session in the database
      session = new Session({
        userId: employer._id,
        sessionId,
        status: 'active',
        createdAt: new Date(),
      });

      await session.save();
    }

    // Respond with success and session information
    res.status(200).json({ 
      message: 'Sign in successful', 
      employer, 
      sessionId: session.sessionId 
    });
  } catch (error) {
    console.error('Error signing in employer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
