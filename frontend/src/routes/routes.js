import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../views/homepage'));
const Signup = lazy(() => import('../views/Signup'));
const About = lazy(() => import('../views/about'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup-employee" element={<Signup />} />
          <Route path="/signup-employer" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
