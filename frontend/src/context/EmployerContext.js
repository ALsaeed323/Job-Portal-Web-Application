import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import employerService from '../services/EmployerService'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to retrieve user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    try {
      let response;
      response = await employerService.signinEmployer(userData);
      setUser(response.employer);
      localStorage.setItem("sessionToken", response.sessionToken);
      localStorage.setItem("user", JSON.stringify(response.employer));

      // Role-based navigation logic
      if (response.employer.userType === "employer") {
        navigate("/");
      } else {
        navigate("/"); // Default fallback
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem("sessionToken");
  
      if (!sessionToken) {
        console.error('No session token found');
        return;
      }
  
      await employerService.logoutEmployer(sessionToken);
  
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem('sessionToken');
  
      
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
