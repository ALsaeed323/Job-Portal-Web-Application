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
const JobMatchList = lazy(() => import('../pages/JobmatchListingsPage'));
const EmpApplications = lazy(() => import('../pages/EmployeeApplications'));
const Applications = lazy(() => import('../pages/EmployerApplications'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  const { user: employerUser, loading: employerLoading } = useEmployerAuth();
  const { user: employeeUser, loading: employeeLoading } = useEmployeeAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);
  const url = location.pathname;
  const user = employerUser || employeeUser;
  const loading = employerLoading || employeeLoading;

  useEffect(() => {
    if (loading) return; // Wait until the loading is complete

    const redirectToDashboard = () => {
      // First handle unauthenticated cases
      if (handleUnauthenticated()) {
        return; // Exit the function if the user is not authenticated
      }
    
      // Check if the user exists and their type is either "employer" or "employee"
      if (user && (user.userType === "employer" || user.userType === "employee")) {
        if (user.userType === "employer" && !user.profileCompleted) {
          navigate('/complete-employer-profile'); // Redirect to employer profile completion
        } else if (user.userType === "employee" && !user.profileCompleted) {
          navigate('/complete-employee-profile'); // Redirect to employee profile completion
        } else {
          navigate('/dashboard'); // Redirect to dashboard
        }
      }
    };
    

    const handleUnauthenticated = () => {
      if (location.pathname.startsWith('/signin-employer')) {
        navigate('/signin-employer');
      } else if (location.pathname.startsWith('/signin-employee')) {
        navigate('/signin-employee');
      } else if (!['/signup-employee-initial',  '/signup-employer-initial'].includes(location.pathname)) {
        navigate('/home'); // Redirect to home or a default page
      }
    };

    if (user) {
      if (location.pathname === '/') {
        redirectToDashboard();
      } else if (['/signin-employer', '/signin-employee', '/signup', '/signup-employee', '/signup-employer-initial'].includes(location.pathname)) {
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
  console.log(url)
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />    {/* Root path '/' leads to Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup-employee-initial" element={<Signup />} />
        <Route path="/complete-employee-profile" element={<Signup />} />
        <Route path="/signup-employer-initial" element={<Signup />} />
        <Route path="/complete-employer-profile" element={<Signup />} />
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
              <Route path="applications" element={<Applications />} />
            </>
          ) : null}
          {user && user.userType === "employee" ? (
            <>
              <Route path="CVBuild" element={<CV />} />
              <Route path="jobmatch" element={<JobMatchList />} />
              <Route path="emapplications" element={<EmpApplications />} />
            </>
          ) : null}
        </Route>
        <Route path="/notaccessible" element={<NotAccessiblePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
