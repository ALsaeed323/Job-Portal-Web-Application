import React, { useState } from 'react';
import { Col, Button, Container, Form } from 'react-bootstrap';
import './EmployeeSignInForm.css';
import Logo from '../../Logo';
import employeeService from '../../../services/EmployeeService'; // Import the service

const EmployeeSignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await employeeService.signinEmployee(formData);
      setMessage(response.message); // Assuming the backend sends a success message
      setMessageType('success');
    } catch (error) {
      console.error('Error signing in employee:', error);
      setMessage(error.response?.message || 'An error occurred. Please try again.');
      setMessageType('error');
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

            {message && (
              <div className={`mb-3 text-${messageType === 'success' ? 'success' : 'danger'}`}>
                {message}
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
