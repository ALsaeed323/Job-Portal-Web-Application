import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../src/views/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup-employee" element={<Signup />} />
        <Route path="/signup-employer" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
