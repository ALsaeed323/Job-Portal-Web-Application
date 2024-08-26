import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';
import { useAuth } from '../context/EmployerContext';

const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../pages/Signup'));
const Signin = lazy(() => import('../pages/Signin'));
const About = lazy(() => import('../pages/about'));
const JobList = lazy(() => import('../pages/jobslist'));
const CreateJobPosting = lazy(() => import('../pages/CreateJobPosting'));
const NotAccessiblePage = lazy(() => import('../pages/NotAccessible'));
const NotFoundpage = lazy(() => import('../pages/NotFound'));
const CV = lazy(() => import('../pages/CV'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  const { user } = useAuth(); // Get the user from AuthContext
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const redirectToDashboard = () => {
      if (user.userType === "employer" || user.userType === "employee") {
        navigate('/dashboard');
      }
    };

    const handleUnauthenticated = () => {
      if (location.pathname.startsWith('/signin-employer')) {
        navigate('/signin-employer');
      } else if (location.pathname.startsWith('/signin-employee')) {
        navigate('/signin-employee');
      } 
    };

    if (user) {
      if (location.pathname === '/') {
        redirectToDashboard();
      } else if (['/signin-employer', '/signin-employee', '/signup', '/signup-employee', '/signup-employer'].includes(location.pathname)) {
        redirectToDashboard();
      }
    } else {
      if (!['/signup-employee', '/signup-employer'].includes(location.pathname)) {
        handleUnauthenticated();
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
          <Route path="CVBuild" element={<CV />} />
        </Route>
        <Route path="/notaccessible" element={<NotAccessiblePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
