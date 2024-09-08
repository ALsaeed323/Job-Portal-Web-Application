import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { AuthProvider } from "./context/EmployerContext";
import { EmployeeAuthProvider } from "./context/EmployeeContext";
import "./App.css";

const App = () => (
  <Router>
    <EmployeeAuthProvider>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
    </EmployeeAuthProvider>
  </Router>
);

export default App;
