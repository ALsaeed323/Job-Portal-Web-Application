import axios from 'axios';

const API_URL = 'http://localhost:4000/api/employees'; // Adjust the port and path as needed

const signupEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, employeeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const signinEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, employeeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const logoutEmployee = async (sessionToken) => {
  try {
  
    const response = await axios.post(`${API_URL}/logout`, { sessionToken });
    return response.data;
  } catch (error) {
    console.error('Logout request failed:', error.response?.data || error.message);
    throw error;
  }
};


export default {
  signupEmployee,
  signinEmployee,
  logoutEmployee,
};
