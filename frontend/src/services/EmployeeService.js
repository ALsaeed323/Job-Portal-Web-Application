import axios from 'axios';

const API_URL = 'http://localhost:4000/api/employees'; // Adjust the port and path as needed

const signupEmployeeInitial = async (formData) => {
  const response = await axios.post(`${API_URL}/signup-initial`, formData);
  return response.data;
};

const completeEmployeeProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/complete-profile`, profileData);
  return response.data;
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
 const saveCVService = async (cvData) => {
  const formData = new FormData();
  formData.append("userId", cvData.userId);
  formData.append("fileName", cvData.fileName);
  formData.append("pdfData", cvData.pdfData); // Add PDF blob

  try {
    const response = await axios.post(`${API_URL}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // Should return { success: true }
  } catch (error) {
    console.error("Error saving CV:", error);
    return { success: false };
  }
};


export default {
  signupEmployeeInitial,
  completeEmployeeProfile,
  signinEmployee,
  logoutEmployee,
  saveCVService,
};
