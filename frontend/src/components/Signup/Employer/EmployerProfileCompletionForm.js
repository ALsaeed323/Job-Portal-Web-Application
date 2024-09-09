import React, { useState, useContext } from 'react';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Logo'; 
import './EmployerSignupForm.css';
import EmployerService from '../../../services/EmployerService';
import { useAuth } from '../../../context/EmployerContext'; // Import your context

export default function EmployerProfileCompletionForm() {
  // Get the employerId from the context
  const {completeProfile, user } = useAuth();
  const employerId = user ? user._id : null; // Adjust based on your context data structure

  const [formData, setFormData] = useState({
    employerId: employerId, // Include employerId in formData
    companyName: '',
    companyDescription: '',
    specialties: '',
    phoneNumber: '',
    address: '',
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
      // Call the profile completion service
      const response = await completeProfile(formData);
      setSuccess('Profile completed successfully!');
      setLoading(false);
      navigate('/dashboard');
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
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h2 className="fw-bold text-uppercase mb-2">Complete Your Profile</h2>
                <p>Please provide the remaining details to complete your profile.</p>
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
                      placeholder="Enter company description"
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
                      placeholder="Enter specialties"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Contact Information */}
                  <Form.Group as={Col} className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Address */}
                  <Form.Group as={Col} className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? 'Completing Profile...' : 'Complete Profile'}
                    </Button>
                  </div>
                  {error && <div className="text-danger mt-3">{error}</div>}
                  {success && <div className="text-success mt-3">{success}</div>}
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
