import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../pages/Signup'));
const About = lazy(() => import('../pages/about'));
const JobList = lazy(() => import('../pages/jobslist'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup-employee" element={<Signup />} />
          <Route path="/signup-employer" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobslist" element={<JobList />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
