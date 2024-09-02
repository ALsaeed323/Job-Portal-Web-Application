import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployerSignupForm from '../components/Signup/Employer/EmployerSignupForm';
import EmployeeSignupForm from '../components/Signup/Employee/EmployeeSignupForm';
import EmployerProfileCompletionForm from '../components/Signup/Employer/EmployerProfileCompletionForm'
import EmployeeProfileCompletionForm from '../components/Signup/Employee/EmployeeProfileCompletionForm'


function Signup() {
  const location = useLocation();
  
  // Get the current URL path
  const url = location.pathname;

  return (
    <>
      {url === '/signup-employee-initial' && <EmployeeSignupForm />}
      {url === '/complete-employee-profile' && <EmployeeProfileCompletionForm />}
      {url === '/signup-employer-initial' && <EmployerSignupForm />}
      {url === '/complete-employer-profile' && <EmployerProfileCompletionForm />}
    </>
  );
}

export default Signup;
