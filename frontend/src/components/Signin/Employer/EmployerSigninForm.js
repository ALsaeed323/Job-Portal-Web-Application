import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import NavigationBar from '../../nav/nav';
import { useNavigate } from 'react-router-dom';
import { useAuth as useEmployerAuth } from '../../../context/EmployerContext'; // Alias for Employer Auth context
import { useAuth as useEmployeeAuth } from '../../../context/EmployeeContext'; // Alias for Employee Auth context

export default function EmployerSigninForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: "", // Role is chosen by the user (either 'employee' or 'employer')
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const { login: employerLogin } = useEmployerAuth(); // Employer login function from EmployerAuth context
  const { login: employeeLogin } = useEmployeeAuth(); // Employee login function from EmployeeAuth context
  const navigate = useNavigate(); // To navigate after successful login

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      // Send the formData with the selected role to the corresponding service
      if (formData.role === "employee") {
        response = await employeeLogin(formData); // Employee login
        setSuccess("Signed in successfully! Redirecting to profile.");
        navigate("/"); // Redirect to employee profile
      } else if (formData.role === "employer") {
        response = await employerLogin(formData); // Employer login
        setSuccess("Signed in successfully! Redirecting to profile.");
        navigate("/"); // Redirect to employer profile
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="gradient-background">
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={10} lg={8} xs={12}>
              <div className="border-3 border-primary border"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-4">
                    <h2 className="fw-bold text-uppercase mb-2">Sign In</h2>
                    <p className="mb-5">Please enter your credentials to sign in!</p>
                    <Form onSubmit={handleSubmit}>
                      {/* Email Address */}
                      <Form.Group as={Col} className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Enter email" 
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
                          placeholder="Enter password" 
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required 
                        />
                      </Form.Group>

                      {/* Role Selection */}
                      <Form.Group as={Col} className="mb-3" controlId="formRole">
                        <Form.Label>Select Role</Form.Label>
                        <Form.Control
                          as="select"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="employee">Employee</option>
                          <option value="employer">Employer</option>
                        </Form.Control>
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </div>
                    </Form>
                    {error && <div className="text-danger mt-3">{error}</div>}
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{' '}
                        <a href="/signup-employer-initial" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
