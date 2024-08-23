import axios from 'axios';

// Adjust the API URL to point to your local backend
const API_URL = 'http://localhost:4000/api/employers';

const signupEmployer = async (employerData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, employerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  const signinEmployer = async (employerData) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, employerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export default {
    signupEmployer,
    signinEmployer,
  };
