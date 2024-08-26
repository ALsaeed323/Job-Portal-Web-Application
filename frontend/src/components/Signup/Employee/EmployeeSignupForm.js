import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import './EmployeeSignupForm.css';
import Logo from '../../Logo';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../../services/EmployeeService'; // Import the service

const skillsOptions = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'SQL', label: 'SQL' },
];

const EmployeeSignupForm = () => {
  const [experiences, setExperiences] = useState([{ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]);
  const [education, setEducation] = useState([{ institutionName: '', degree: '', graduationYear: '' }]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    professionalSummary: '',
  });

  const navigate = useNavigate();
  const handleSkillsChange = (newValue, actionMeta) => {
    setSelectedSkills(newValue || []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding new experience fields
  const addExperience = () => {
    setExperiences([...experiences, { jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]);
  };

  // Handle adding new education fields
  const addEducation = () => {
    setEducation([...education, { institutionName: '', degree: '', graduationYear: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      ...formData,
      skills: selectedSkills.map(skill => skill.value),
      experiences,
      education,
    };
    try {
      const response = await employeeService.signupEmployee(employeeData);
      alert('Employee signed up successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up employee:', error);
      alert('Failed to sign up. Please try again.');
    }
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

          {/* Phone Number */}
          <Form.Group as={Col} className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number (optional)"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Professional Summary */}
          <Form.Group as={Col} className="mb-3" controlId="formProfessionalSummary">
            <Form.Label>Professional Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a brief summary or bio (optional)"
              name="professionalSummary"
              value={formData.professionalSummary}
              onChange={handleChange}
            />
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
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name={`jobTitle${index}`}
                  value={experience.jobTitle}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].jobTitle = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formCompanyName${index}`}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  name={`companyName${index}`}
                  value={experience.companyName}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].companyName = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  required
                />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId={`formStartDate${index}`}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name={`startDate${index}`}
                      value={experience.startDate}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].startDate = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formEndDate${index}`}>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name={`endDate${index}`}
                      value={experience.endDate}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].endDate = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId={`formDescription${index}`}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe your responsibilities and achievements"
                  name={`description${index}`}
                  value={experience.description}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].description = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  required
                />
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
                <Form.Control
                  type="text"
                  placeholder="Enter institution name"
                  name={`institutionName${index}`}
                  value={edu.institutionName}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].institutionName = e.target.value;
                    setEducation(newEducation);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formDegree${index}`}>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter degree obtained"
                  name={`degree${index}`}
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].degree = e.target.value;
                    setEducation(newEducation);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`formGraduationYear${index}`}>
                <Form.Label>Year of Graduation</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter graduation year"
                  name={`graduationYear${index}`}
                  value={edu.graduationYear}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].graduationYear = e.target.value;
                    setEducation(newEducation);
                  }}
                  required
                />
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
