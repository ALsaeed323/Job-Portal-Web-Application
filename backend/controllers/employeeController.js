import Employee from '../models/employeeModel.js';
import bcrypt from 'bcrypt';
import Session from '../models/employeeSesstionModel.js'; 
import generateSessionToken from '../utils/gsesstion.js';
import CV from "../models/cvModel.js";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET 

export const signupEmployeeInitial = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new employee record with only the initial required fields
    const newEmployee = new Employee({ email, password, profileCompleted: false }); // Set profileCompleted to false
    await newEmployee.save();
    res.status(201).json({ message: 'Employee initial signup successful', employeeId: newEmployee._id });
  } catch (error) {
    res.status(400).json({ message: 'Error during initial signup', error });
  }
};

// Complete the employee profile with additional details
export const completeEmployeeProfile = async (req, res) => {
  const { employeeId, fullName,phoneNumber, professionalSummary, skills, experiences, education } = req.body;

  // Check if employeeId is provided
  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    
    // If employee is not found, return a 404 error
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the employee with the additional profile details
    employee. fullName = fullName || employee.fullName;
    employee.phoneNumber = phoneNumber || employee.phoneNumber;
    employee.professionalSummary = professionalSummary || employee.professionalSummary;
    employee.skills = skills && skills.length > 0 ? skills : employee.skills;
    employee.experiences = experiences && experiences.length > 0 ? experiences : employee.experiences;
    employee.education = education && education.length > 0 ? education : employee.education;
    employee.profileCompleted = true; // Set profileCompleted to true

    // Save the updated employee
    await employee.save();

    res.status(200).json({ employee,  message: 'Profile completed successfully' });

  } catch (error) {
    // Log the error and send a 400 status with error message
    console.error('Error during profile completion:', error);
    res.status(500).json({ message: 'Error during profile completion', error: error.message });
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
    if (!isMatch) {
      return res.status(200).json({ message: 'Invalid email or password' });
    }

    // Check if there's an active session for the employee
    const activeSession = await Session.findOne({
      userId: employee._id,
      status: "active",
    });

    // If an active session exists, return a message
    if (activeSession) {
      return res.status(200).json({ message: "An active session already exists" });
    }

    // If no active session, generate a new session
    const sessionToken = generateSessionToken(
      { userId: employee._id, role: 'employee' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Adjust expiration as needed
    );

    // Create and save a new session
    const newSession = new Session({
      userId: employee._id,
      sessionId: sessionToken,
      status: 'active',
      createdAt: new Date(),
    });

    await newSession.save();

    // Respond with success and the new session token
    res.status(200).json({
      message: 'Sign in successful',
      employee,
      sessionToken: newSession.sessionId, // Return the new JWT token as sessionToken
    });
  } catch (error) {
    console.error('Error signing in employee:', error);
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
export const saveCV = async (req, res) => {
  try {
    const { userId, fileName } = req.body;
    const pdfData = req.file.buffer; // Assuming you're using multer to handle file uploads

    // Create a new CV record
    const newCV = new CV({
      userId,
      fileName,
      pdfData,
    });

    await newCV.save();

    res.status(200).json({ success: true, message: "CV saved successfully!" });
  } catch (error) {
    console.error("Error saving CV:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
