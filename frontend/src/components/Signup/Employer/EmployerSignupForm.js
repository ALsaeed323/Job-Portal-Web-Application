import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployerService from '../../../services/EmployerService';
import Logo from '../../Logo';
import './EmployerSignupForm.css';

export default function EmployerSignupInitialForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
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
      // Call the initial sign-up service
      await EmployerService.signupEmployerInitial(formData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <>
      <Logo />
      <div className="gradien-background">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={6}>
            <Card className="shadow">
              <Card.Body>
                <h2 className="fw-bold text-uppercase mb-2">Employer Sign-Up</h2>
                <p>Please enter your email and password to create an account.</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
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
                  <Form.Group className="mb-3" controlId="formPassword">
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
                      {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                  </div>
                  {error && <div className="text-danger mt-3">{error}</div>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}
