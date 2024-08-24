import Employee from '../models/employeeModel.js';

export const signupEmployee = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, professionalSummary, skills, experiences, education } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
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
