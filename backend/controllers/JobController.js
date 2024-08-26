// controllers/JobController.js
import Job from '../models/jobModel.js';
import Employee from '../models/employeeModel.js';
import Application from '../models/Application.js';



// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const { title, companyName, location, description, requirements, applicationDeadline,userId } = req.body;

    const newJob = new Job({
      title,
      companyName,
      location,
      description,
      requirements,
      applicationDeadline,
      userId,
     
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all job postings
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const matchJobs = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const matchedJobs = await Job.find({
      requirements: { $in: employee.skills },
    });

    // Optional: Further refine the matching by comparing experiences or using advanced algorithms

    res.status(200).json(matchedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const applyForJob = async (req, res) => {
  const { jobId, employeeId } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({ jobId, employeeId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({ jobId, employeeId });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const getEmployeeApplications = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const applications = await Application.find({ employeeId }).populate('jobId');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
