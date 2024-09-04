import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './CreateJobPostingForm.css'; // Add appropriate styles in this CSS file
import JobService from '../../services/JobService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/EmployerContext';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
    requirements: '',
    applicationDeadline: '',
    userId: '', // This will be updated in useEffect
  });

  useEffect(() => {
    if (user && user._id) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user._id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JobService.createJob(formData);
      console.log('Job created successfully:', response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="gradient-background">
      <Container className="form-container">
        <h2 className="fw-bold text-uppercase mb-4 text-center">Create Job Posting</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Job Title */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Company Name */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCompanyName">
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
            </Col>
          </Row>

          <Row>
            {/* Location */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Application Deadline */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formApplicationDeadline">
                <Form.Label>Application Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Job Description */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter job description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Requirements */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formRequirements">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter job requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Create Posting
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateJobPosting;
