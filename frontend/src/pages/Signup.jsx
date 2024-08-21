import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployerSignupForm from '../components/Signup/Employer/EmployerSignupForm';
import EmployeeSignupForm from '../components/Signup/Employee/EmployeeSignupForm';

function Signup() {
  const location = useLocation();
  
  // Get the current URL path
  const url = location.pathname;

  return (
    <>
      {url === '/signup-employee' && <EmployeeSignupForm />}
      {url === '/signup-employer' && <EmployerSignupForm />}
    </>
  );
}

export default Signup;
