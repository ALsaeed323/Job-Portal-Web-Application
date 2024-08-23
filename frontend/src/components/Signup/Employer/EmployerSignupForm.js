import React, { useState } from 'react';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Logo from '../../Logo';
import EmployerService from '../../../services/EmployerService'; // Import the service

export default function EmployerSignupForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    specialties: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: '', // Add password to the form data
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const response = await EmployerService.signupEmployer(formData);
      alert('Employer signed up successfully!');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <div className="gradient-background">
      <Logo />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <div className="border-3 border-primary border"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold text-uppercase mb-2">Company </h2>
                  <p className="mb-5">Please enter your details to join us!</p>
                  <Form onSubmit={handleSubmit}>
                    {/* Company Name */}
                    <Form.Group as={Col} className="mb-3" controlId="formCompanyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter company name" 
                        name="companyName" 
                        value={formData.companyName}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>

                    {/* Company Description */}
                    <Form.Group as={Col} className="mb-3" controlId="formCompanyDescription">
                      <Form.Label>Company Description</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Enter company description (optional)" 
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Specialties */}
                    <Form.Group as={Col} className="mb-3" controlId="formSpecialties">
                      <Form.Label>Specialties</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter company’s specialties or industry focus" 
                        name="specialties"
                        value={formData.specialties}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>

                    {/* Contact Information */}
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="Enter phone number (optional)" 
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Enter email (optional)" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    {/* Password Field */}
                    <Form.Group as={Col} className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="Enter a password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>

                    {/* Address */}
                    <Form.Group as={Col} className="mb-3" controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter company address (optional)" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                      </Button>
                    </div>
                  </Form>
                  {error && <div className="text-danger mt-3">{error}</div>}
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Already have an account?{' '}
                      <a href="/login" className="text-primary fw-bold">
                        Sign In
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
  );
}
