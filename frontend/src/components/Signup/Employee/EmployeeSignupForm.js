import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import './EmployeeSignupForm.css';
import Logo from '../../Logo';

const skillsOptions = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'SQL', label: 'SQL' },
  // Add more skills as needed
];

const EmployeeSignupForm = () => {
  const [experiences, setExperiences] = useState([{ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]);
  const [education, setEducation] = useState([{ institutionName: '', degree: '', graduationYear: '' }]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillsChange = (newValue, actionMeta) => {
    setSelectedSkills(newValue || []);
  };

  // Handle adding new experience fields
  const addExperience = () => {
    setExperiences([...experiences, { jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]);
  };

  // Handle adding new education fields
  const addEducation = () => {
    setEducation([...education, { institutionName: '', degree: '', graduationYear: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Skills:', selectedSkills.map(skill => skill.value));
    // Handle form submission
  };

  return (
    <div className="gradient-background">
          <Logo/>
      <div className="form-container">
        <h2 className="fw-bold text-uppercase mb-4 text-center">Employee Registration</h2>
        <Form onSubmit={handleSubmit}>
          {/* Full Name */}
          <Form.Group as={Col} className="mb-3" controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" required />
          </Form.Group>

          {/* Email Address */}
          <Form.Group as={Col} className="mb-3" controlId="formEmailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" required />
          </Form.Group>

          {/* Password */}
          <Form.Group as={Col} className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Set a password" required />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group as={Col} className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number (optional)" />
          </Form.Group>

          {/* Professional Summary */}
          <Form.Group as={Col} className="mb-3" controlId="formProfessionalSummary">
            <Form.Label>Professional Summary</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter a brief summary or bio (optional)" />
          </Form.Group>

          {/* Skills */}
          <Form.Group as={Col} className="mb-3" controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <CreatableSelect
              isMulti
              options={skillsOptions}
              value={selectedSkills}
              onChange={handleSkillsChange}
              placeholder="Select or add skills"
              formatCreateLabel={(inputValue) => `Add "${inputValue}" as a skill`}
            />
          </Form.Group>

          {/* Experience Section */}
          <h5>Experience</h5>
          {experiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <Form.Group className="mb-3" controlId={`formJobTitle${index}`}>
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Enter job title" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formCompanyName${index}`}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" required />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId={`formStartDate${index}`}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formEndDate${index}`}>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId={`formDescription${index}`}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Describe your responsibilities and achievements" required />
              </Form.Group>
            </div>
          ))}
          <Button variant="secondary" onClick={addExperience}>
            Add Another Experience
          </Button>

          {/* Education Section */}
          <h5 className="mt-4">Education</h5>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <Form.Group className="mb-3" controlId={`formInstitutionName${index}`}>
                <Form.Label>Institution Name</Form.Label>
                <Form.Control type="text" placeholder="Enter institution name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formDegree${index}`}>
                <Form.Label>Degree</Form.Label>
                <Form.Control type="text" placeholder="Enter degree obtained" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formGraduationYear${index}`}>
                <Form.Label>Year of Graduation</Form.Label>
                <Form.Control type="number" placeholder="Enter graduation year" required />
              </Form.Group>
            </div>
          ))}
          <Button variant="secondary" onClick={addEducation}>
            Add Another Education
          </Button>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeSignupForm;
