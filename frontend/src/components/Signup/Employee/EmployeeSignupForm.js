import React, { useState } from 'react';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Logo';
import employeeService from '../../../services/EmployeeService';
import './EmployeeSignupForm.css';

const EmployeeSignupInitialForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await employeeService.signupEmployeeInitial(formData);
      setSuccess('Employee signed up successfully! Please complete your profile.');
      setLoading(false);
      navigate('/complete-profile'); // Redirect to profile completion page
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <>
    
      <Logo />
      <div className="gradient-background">
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={6} lg={4} xs={12}>
              <Card className="shadow">
                <Card.Body>
                  <h2 className="fw-bold text-uppercase mb-4 text-center">Employee Signup</h2>
                  <Form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <Form.Group as={Col} className="mb-3" controlId="formFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

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
                        placeholder="Set a password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                      </Button>
                    </div>
                  </Form>
                  {error && <div className="text-danger mt-3">{error}</div>}
                  {success && <div className="text-success mt-3">{success}</div>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmployeeSignupInitialForm;
