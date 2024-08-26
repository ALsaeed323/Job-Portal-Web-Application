import React from 'react';
import './404.css';
import { useAuth } from "../../context/EmployerContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (user) {
            navigate('/'); // Redirect to the dashboard if the user is logged in
        } else {
            navigate('/'); // Redirect to the sign-in page if the user is not logged in
        }
    };

    return (
        <section className="py-5">
            <div className="d-flex justify-content-center align-items-center flex-column text-center w-100">
                <div className="bg_img w-50"></div>
                <div>
                    <p className="display-4">Looks Like You're Lost</p>
                    <p>The page you are looking for is not available...</p>
                    <button 
                        onClick={handleNavigation} 
                        className="text-white text-decoration-none px-4 py-3 bg-success d-inline-block mt-2 rounded">
                        Go to Home
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
