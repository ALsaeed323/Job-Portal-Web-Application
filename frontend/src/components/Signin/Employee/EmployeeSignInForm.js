import React, { useState } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import './EmployeeSignInForm.css';
import Logo from '../../Logo';
import { useAuth } from '../../../context/EmployeeContext'; // Import the Auth context


const EmployeeSignInForm = () => {

console.log("sssssssssssssssssssssssssss")
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setSuccessMessage('Login successful');
      setErrorMessage('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Logo />
      <div className="gradient-background">
        <div className="form-container">
          <h2 className="fw-bold text-uppercase mb-4 text-center">Employee Sign-In</h2>
          <Form onSubmit={handleSubmit}>
            {/* Email Address */}
            <Form.Group as={Col} className="mb-3" controlId="formEmailAddress">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group as={Col} className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {successMessage && (
              <div className="mb-3 text-success">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-3 text-danger">
                {errorMessage}
              </div>
            )}

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmployeeSignInForm;
