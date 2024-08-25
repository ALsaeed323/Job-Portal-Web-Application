// controllers/JobController.js
import Job from '../models/jobModel.js';

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

