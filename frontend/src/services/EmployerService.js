import axios from 'axios';

// Adjust the API URL to point to your local backend
const API_URL = 'http://localhost:4000/api/employers';

// const signupEmployer = async (employerData) => {
//     try {
//       const response = await axios.post(`${API_URL}/signup`, employerData);
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   };
  
const signupEmployerInitial = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup-initial`, formData);
    return response.data;
  } catch (error) {
    console.error('Error during initial signup:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to complete the employer profile
const completeEmployerProfile = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/complete-profile`, formData);
    return response.data;
  } catch (error) {
    console.error('Error during profile completion:', error.response?.data || error.message);
    throw error.response?.data || error.message;
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
  const logoutEmployer = async (sessionToken) => {
    try {
    
      const response = await axios.post(`${API_URL}/logout`, { sessionToken });
      return response.data;
    } catch (error) {
      console.error('Logout request failed:', error.response?.data || error.message);
      throw error;
    }
  };
  export default {
    signupEmployerInitial,
   completeEmployerProfile,
    signinEmployer,
    logoutEmployer,
  };
