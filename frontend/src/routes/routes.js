import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../pages/Signup'));
const Signin = lazy(() => import('../pages/Signin'));
const About = lazy(() => import('../pages/about'));
const JobList = lazy(() => import('../pages/jobslist'));

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
      if (user.userType === "employer" && location.pathname === '/') {
        navigate('/dashboard'); // Redirect employers to their dashboard
      } else if (user.userType === "employee" && location.pathname === '/') {
        navigate('/profile'); // Redirect employees to their profile page
      } else if (['/signin', '/signup'].includes(location.pathname)) {
        navigate('/'); // Redirect logged-in users away from signin/signup
      }
    } else {
      if (location.pathname !== '/signup' && location.pathname !== '/signup-employee' && location.pathname !== '/signup-employer') {
        navigate('/signin'); // Redirect unauthenticated users to signin
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
        <Route path="/" element={<Home />} />
        <Route path="/signup-employee" element={<Signup />} />
        <Route path="/signup-employer" element={<Signup />} />
        <Route path="/signin-employee" element={<Signin />} />
        <Route path="/signin-employer" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<FullLayout />}>
          <Route path="jobslist" element={<JobList />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
