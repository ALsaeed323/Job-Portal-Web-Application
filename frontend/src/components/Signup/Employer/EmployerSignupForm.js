import React from 'react';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import './EmployerSignupForm.css'; // Ensure you import your CSS file
import Logo from '../../Logo';

export default function EmployerSignupForm() {
  return (
    <div className="gradient-background">
        <Logo/>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <div className="border-3 border-primary border"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold text-uppercase mb-2">Company </h2>
                  <p className="mb-5">Please enter your details to join us!</p>
                  <Form>
                    {/* Company Name */}
                    <Form.Group as={Col} className="mb-3" controlId="formCompanyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter company name" required />
                    </Form.Group>

                    {/* Company Description */}
                    <Form.Group as={Col} className="mb-3" controlId="formCompanyDescription">
                      <Form.Label>Company Description</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter company description (optional)" />
                    </Form.Group>

                    {/* Specialties */}
                    <Form.Group as={Col} className="mb-3" controlId="formSpecialties">
                      <Form.Label>Specialties</Form.Label>
                      <Form.Control type="text" placeholder="Enter company’s specialties or industry focus" required />
                    </Form.Group>

                    {/* Contact Information */}
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter phone number (optional)" />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email (optional)" />
                      </Form.Group>
                    </Row>

                    {/* Address */}
                    <Form.Group as={Col} className="mb-3" controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter company address (optional)" />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Sign Up
                      </Button>
                    </div>
                  </Form>
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
