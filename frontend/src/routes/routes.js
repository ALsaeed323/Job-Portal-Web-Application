import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';
import { useAuth } from '../context/EmployerContext'; // Assuming you have an AuthContext

const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../pages/Signup'));
const Signin = lazy(() => import('../pages/Signin'));
const About = lazy(() => import('../pages/about'));
const JobList = lazy(() => import('../pages/jobslist'));
const CreateJobPosting = lazy(() => import('../pages/CreateJobPosting'));
const NotAccessiblePage = lazy(() => import('../pages/NotAccessible'));
const NotFoundpage = lazy(() => import('../pages/NotFound'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  const { user } = useAuth(); // Get the user from AuthContext
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    console.log('Current URL:', location.pathname); // Log the current URL
    console.log(user);
  
    if (user) {
      // If the user is logged in and is an employer or employee, navigate to their respective dashboard
      if (user.userType === "employer" && location.pathname === '/') {
        navigate('/dashboard'); // Redirect employers to their dashboard
      } else if (user.userType === "employee" && location.pathname === '/') {
        navigate('/dashboard'); // Redirect employees to their dashboard
      } else if (['/signin-employer', '/signin-employee', '/signup', '/signup-employee', '/signup-employer'].includes(location.pathname)) {
        navigate('/dashboard'); // Redirect logged-in users away from signin/signup pages
      }
    } else {
      // If the user is not logged in, redirect based on the path they are trying to access
      if ([ '/signup-employee', '/signup-employer'].includes(location.pathname)) {
        // Allow access to signup pages
        return;
      } else if (location.pathname.startsWith('/signin-employer')) {
        navigate('/signin-employer'); // Redirect to employer signin
      } else if (location.pathname.startsWith('/signin-employee')) {
        navigate('/signin-employee'); // Redirect to employee signin
      }
    }
  
    setInitialLoading(false);
  }, [user, location.pathname, navigate]);
  
  
  if (initialLoading) {
    return <Loading />; // Display loading indicator while checking user state
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
      <Route path="/" element={<Home />} />    {/* Root path '/' leads to Home */}
      <Route path="/home" element={<Home />} /> {/* '/home' path also leads to Home */}
        <Route path="/signup-employee" element={<Signup />} />
        <Route path="/signup-employer" element={<Signup />} />
        <Route path="/signin-employee" element={<Signin />} />
        <Route path="/signin-employer" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<FullLayout />}>
          <Route path="jobslist" element={<JobList />} />
          <Route path="Createposting" element={<CreateJobPosting />} />
        </Route>
        <Route path="/notaccessible" element={<NotAccessiblePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
