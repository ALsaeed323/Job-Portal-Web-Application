import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployerSigninForm from '../components/Signin/Employer/EmployerSigninForm';
// import EmployeeSigninForm from '../components/Signin/Employee/EmployeeSigninForm';

function Signin() {
  const location = useLocation();
  
  // Get the current URL path
  const url = location.pathname;

  return (
    <>
      {/* {url === '/signin-employee' && <EmployeeSigninForm />} */}
      {url === '/signin-employer' && <EmployerSigninForm />}
    </>
  );
}

export default Signin;
