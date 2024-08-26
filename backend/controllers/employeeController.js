import Employee from '../models/employeeModel.js';
import bcrypt from 'bcrypt';
import Session from '../models/employeeSesstionModel.js'; 
import generateSessionToken from '../utils/gsesstion.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

export const signupEmployee = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, professionalSummary, skills, experiences, education } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(200).json({ message: 'Employee with this email already exists' });
    }

    // Create a new employee
    const newEmployee = new Employee({
      fullName,
      email,
      password,
      phoneNumber,
      professionalSummary,
      skills,
      experiences,
      education,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee signed up successfully!', employee: newEmployee });
  } catch (error) {
    console.error('Error signing up employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const signinEmployee = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the employee exists
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(200).json({ message: 'Invalid email or password' });
      }
  
      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, employee.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(200).json({ message: 'Invalid email or password' });
      }

      // Check if there's an active session for the employee
      const activeSession = await Session.findOne({
        userId: employee._id,
        status: "active",
      });
  
      if (activeSession) {
        console.log("An active session already exists")
        return res.status(200).json({ message: "An active session already exists" });
      }
  
      // Check if there's an inactive session and reactivate it
      let session = await Session.findOne({
        userId: employee._id,
        status: "inactive",
      });
  
      if (session) {
        session.status = "active";
        session.lastAccess = new Date();
        await session.save();
      } else {
        // Generate a JWT session token instead of a random session ID
        const sessionToken = generateSessionToken({ 
          userId: employee._id, 
          role: 'employee' 
        }, process.env.JWT_SECRET, { expiresIn: '1h' });  // Adjust expiration as needed
  
        // Create a new session in the database
        session = new Session({
          userId: employee._id,
          sessionId: sessionToken,
          status: 'active',
          createdAt: new Date(),
        });
  
        await session.save();
      }
  
      // Respond with success and the JWT token
      res.status(200).json({ 
        message: 'Sign in successful', 
        employee, 
        sessionToken: session.sessionId  // JWT token is returned as sessionToken
      });
    } catch (error) {
      console.error('Error signing in employee:', error);
      res.status(200).json({ message: 'Server error' });
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
