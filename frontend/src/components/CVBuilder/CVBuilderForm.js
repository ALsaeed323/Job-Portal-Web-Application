import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import jsPDF from "jspdf";
import { useAuth } from "../../context/EmployerContext";
import "./CVBuilderForm.css";

const CVBuilderForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    professionalSummary: "",
    skills: [],
    experiences: [],
    education: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          jobTitle: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institutionName: "", degree: "", graduationYear: "" },
      ],
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    // Your PDF generation code here...
    doc.save(`${formData.fullName}_CV.pdf`);
  };

  return (
    <div className="gradient-background">
      <Container className="form-container">
        <h2 className="fw-bold text-uppercase mb-6 text-center">
          Build Your CV
        </h2>
        <Form>
          <Row>
            {/* Full Name */}
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formFullName">
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
            </Col>

            {/* Email */}
            <Col md={4}>
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
            </Col>

            {/* Phone Number */}
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Skills */}
            <Col>
              <Form.Group className="mb-4" controlId="formSkills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your skills"
                  name="skills"
                  value={formData.skills.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value.split(", "),
                    })
                  }
                />
              </Form.Group>
            </Col>
            {/* Professional Summary */}
            <Col>
              <Form.Group className="mb-3" controlId="formProfessionalSummary">
                <Form.Label>Professional Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter a brief summary or bio"
                  name="professionalSummary"
                  value={formData.professionalSummary}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Experience Section */}
          <h5>Experience</h5>
          {formData.experiences.map((experience, index) => (
            <Row key={index} className="mb-4">
              <Col md={6}>
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
              </Col>

              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId={`formCompanyName${index}`}
                >
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
              </Col>

              <Col md={6}>
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

              <Col md={6}>
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

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId={`formDescription${index}`}
                >
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
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={addExperience} className="mb-3">
            Add Another Experience
          </Button>

          {/* Education Section */}
          <h5 className="mt-4">Education</h5>
          {formData.education.map((edu, index) => (
            <Row key={index} className="mb-4">
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId={`formInstitutionName${index}`}
                >
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
              </Col>

              <Col md={6}>
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
              </Col>

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId={`formGraduationYear${index}`}
                >
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
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={addEducation} className="mb-3">
            Add Another Education
          </Button>

          <div className="d-grid mt-4">
            <Button variant="primary" onClick={handleDownload}>
              Download CV
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CVBuilderForm;
