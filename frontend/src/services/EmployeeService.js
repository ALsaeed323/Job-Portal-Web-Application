import axios from 'axios';

const API_URL = 'http://localhost:4000/api/employees';  // Adjust the port and path as needed

const signupEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, employeeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  signupEmployee,
};
