import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Logo from '../../Logo';
import { useAuth } from '../../../context/EmployeeContext';
import './EmployeeProfileCompletionForm.css';

const skillsOptions = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'SQL', label: 'SQL' },
];

const EmployeeProfileCompletionForm = () => {
  const { completeProfile, user } = useAuth();
  const employeeId = user ? user._id : null;

  const [formData, setFormData] = useState({
    employeeId: employeeId,
    fullName: '',
    phoneNumber: '',
    professionalSummary: '',
    skills: [],
    experiences: [{ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }],
    education: [{ institutionName: '', degree: '', graduationYear: '' }],
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillsChange = (newValue) => {
    setSelectedSkills(newValue || []);
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institutionName: '', degree: '', graduationYear: '' }],
    });
  };

  const validateExperiences = () => {
    return formData.experiences.every(exp => exp.jobTitle && exp.companyName && exp.startDate && exp.endDate);
  };

  const validateEducation = () => {
    return formData.education.every(edu => edu.institutionName && edu.degree && edu.graduationYear);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateExperiences()) {
      setError('Please fill out all fields in the Experience section.');
      setLoading(false);
      return;
    }

    if (!validateEducation()) {
      setError('Please fill out all fields in the Education section.');
      setLoading(false);
      return;
    }

    try {
      const profileData = {
        ...formData,
        skills: selectedSkills.map((skill) => skill.value),
      };

      const response = await completeProfile(profileData);
      setSuccess('Profile completed successfully!');
      setLoading(false);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  return (
    <>
      <Logo />
      <div className="gradient-background">
        <Container>
          <Row className="vh-200 d-flex justify-content-center align-items-center">
            <Col md={8}>
              <Card className="shadow">
                <Card.Body>
                  <h2 className="fw-bold text-uppercase mb-2">Complete Your Profile</h2>
                  <p>Please provide the remaining details to complete your profile.</p>

                  {/* Progress Bar */}
                  <ProgressBar now={(step / 3) * 100} label={`Step ${step} of 3`} />

                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
                        {/* Step 1: Personal Details */}
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

                        <Form.Group as={Col} className="mb-3" controlId="formProfessionalSummary">
                          <Form.Label>Professional Summary</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter a brief summary"
                            name="professionalSummary"
                            value={formData.professionalSummary}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        {/* Step 2: Skills */}
                        <Form.Group as={Col} className="mb-3" controlId="formSkills">
                          <Form.Label>Skills</Form.Label>
                          <CreatableSelect
                            isMulti
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                            placeholder="Select or add skills"
                          />
                        </Form.Group>

                        {/* Experience Section */}
                        <h5>Experience</h5>
                    {formData.experiences.map((experience, index) => (
                      <div key={index} className="mb-4">
                        <Form.Group className="mb-3" controlId={`formJobTitle${index}`}>
                          <Form.Label>Job Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter job title"
                            name={`jobTitle${index}`}
                            value={experience.jobTitle}
                            onChange={(e) => {
                              const newExperiences = [...formData.experiences];
                              newExperiences[index].jobTitle = e.target.value;
                              setFormData({ ...formData, experiences: newExperiences });
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
                              const newExperiences = [...formData.experiences];
                              newExperiences[index].companyName = e.target.value;
                              setFormData({ ...formData, experiences: newExperiences });
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
                                  const newExperiences = [...formData.experiences];
                                  newExperiences[index].startDate = e.target.value;
                                  setFormData({ ...formData, experiences: newExperiences });
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
                                  const newExperiences = [...formData.experiences];
                                  newExperiences[index].endDate = e.target.value;
                                  setFormData({ ...formData, experiences: newExperiences });
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
                              const newExperiences = [...formData.experiences];
                              newExperiences[index].description = e.target.value;
                              setFormData({ ...formData, experiences: newExperiences });
                            }}
                            required
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <Button variant="secondary" onClick={addExperience}>
                      Add Another Experience
                    </Button>

                      </>
                    )}

                    {step === 3 && (
                      <>
                        {/* Step 3: Education */}
                        <h5 className="mt-4">Education</h5>
                    {formData.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <Form.Group className="mb-3" controlId={`formInstitutionName${index}`}>
                          <Form.Label>Institution Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter institution name"
                            name={`institutionName${index}`}
                            value={edu.institutionName}
                            onChange={(e) => {
                              const newEducation = [...formData.education];
                              newEducation[index].institutionName = e.target.value;
                              setFormData({ ...formData, education: newEducation });
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
                              const newEducation = [...formData.education];
                              newEducation[index].degree = e.target.value;
                              setFormData({ ...formData, education: newEducation });
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
                              const newEducation = [...formData.education];
                              newEducation[index].graduationYear = e.target.value;
                              setFormData({ ...formData, education: newEducation });
                            }}
                            required
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <Button variant="secondary" onClick={addEducation}>
                      Add Another Education
                    </Button>
                      </>
                    )}

                    {/* Step Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                      {step > 1 && (
                        <Button variant="secondary" onClick={handleBack}>
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button variant="primary" onClick={handleNext}>
                          Next
                        </Button>
                      ) : (
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? 'Completing Profile...' : 'Complete Profile'}
                        </Button>
                      )}
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
};

export default EmployeeProfileCompletionForm;
