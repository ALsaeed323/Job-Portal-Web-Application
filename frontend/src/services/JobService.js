import axios from 'axios';

// Adjust the API URL to point to your local backend
const API_URL = 'http://localhost:4000/api/jobs';

const createJob = async (jobData) => {
  try {
    console.log(jobData);
    const response = await axios.post(`${API_URL}/createjobs`, jobData);
    return response.data;
  } catch (error) {
    console.error('Job creation failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/getjobs`);
    return response.data;
  } catch (error) {
    console.error('Fetching jobs failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
const jobMatching = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/match/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Job matching failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
const applyForJob = async (jobId, employeeId) => {
  try {
    const response = await axios.post(`${API_URL}/apply`, { jobId, employeeId });
    return response.data;
  } catch (error) {
    console.error('Job application failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
const getEmployeeApplications = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Fetching applications failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};




export default {
  createJob,
  getAllJobs,
  jobMatching,
  applyForJob,
  getEmployeeApplications,
 
};
