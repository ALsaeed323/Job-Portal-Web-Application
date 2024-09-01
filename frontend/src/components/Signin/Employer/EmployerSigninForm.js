import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Logo from '../../Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/EmployerContext';

export default function EmployerSigninForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Use the login function from the Auth context
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
      const response = await login(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Logo />
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
