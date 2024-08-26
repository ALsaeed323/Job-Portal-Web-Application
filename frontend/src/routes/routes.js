import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';
import { useAuth as useEmployerAuth } from '../context/EmployerContext';
import { useAuth as useEmployeeAuth } from '../context/EmployeeContext';

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
  const { user: employerUser, loading: employerLoading } = useEmployerAuth();
  const { user: employeeUser, loading: employeeLoading } = useEmployeeAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);

  const user = employerUser || employeeUser;
  const loading = employerLoading || employeeLoading;

  useEffect(() => {
    if (loading) return; // Wait until the loading is complete

    const redirectToDashboard = () => {
      if (user && (user.userType === "employer" || user.userType === "employee")) {
        navigate('/dashboard');
      }
    };

    const handleUnauthenticated = () => {
      if (location.pathname.startsWith('/signin-employer')) {
        navigate('/signin-employer');
      } else if (location.pathname.startsWith('/signin-employee')) {
        navigate('/signin-employee');
      } else if (!['/signup-employee', '/signup-employer'].includes(location.pathname)) {
        navigate('/home'); // Redirect to home or a default page
      }
    };

    if (user) {
      if (location.pathname === '/') {
        redirectToDashboard();
      } else if (['/signin-employer', '/signin-employee', '/signup', '/signup-employee', '/signup-employer'].includes(location.pathname)) {
        redirectToDashboard();
      }
    } else {
      handleUnauthenticated();
    }

    setInitialLoading(false);
  }, [user, location.pathname, navigate, loading]);

  if (initialLoading || loading) {
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
        <Route 
          path="/dashboard" 
          element={<FullLayout />}
        >
          {user && user.userType === "employer" ? (
            <>
              <Route path="jobslist" element={<JobList />} />
              <Route path="Createposting" element={<CreateJobPosting />} />
            </>
          ) : null}
          {user && user.userType === "employee" ? (
            <Route path="CVBuild" element={<CV />} />
          ) : null}
        </Route>
        <Route path="/notaccessible" element={<NotAccessiblePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
