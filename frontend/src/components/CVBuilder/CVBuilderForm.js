import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { useAuth } from '../../context/EmployerContext';
import { Row } from 'react-bootstrap';
import './CVBuilderForm.css';

const CVBuilderForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        professionalSummary: '',
        skills: [],
        experiences: [],
        education: [],
        companyData: '',
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
            experiences: [...formData.experiences, { jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' }]
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { institutionName: '', degree: '', graduationYear: '' }]
        });
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text(`CV of ${formData.fullName}`, 10, 10);
        doc.text(`Email: ${formData.email}`, 10, 20);
        doc.text(`Phone: ${formData.phoneNumber}`, 10, 30);
        doc.text(`Summary: ${formData.professionalSummary}`, 10, 40);
        doc.text(`Skills: ${formData.skills.join(', ')}`, 10, 50);

        // Adding experiences
        let yPosition = 60;
        formData.experiences.forEach((exp, index) => {
            doc.text(`Experience ${index + 1}:`, 10, yPosition);
            doc.text(`Job Title: ${exp.jobTitle}`, 10, yPosition + 10);
            doc.text(`Company: ${exp.companyName}`, 10, yPosition + 20);
            doc.text(`Start Date: ${exp.startDate}`, 10, yPosition + 30);
            doc.text(`End Date: ${exp.endDate}`, 10, yPosition + 40);
            doc.text(`Description: ${exp.description}`, 10, yPosition + 50);
            yPosition += 60;
        });

        // Adding education
        yPosition += 10; // Add a little space before starting the education section
        formData.education.forEach((edu, index) => {
            doc.text(`Education ${index + 1}:`, 10, yPosition);
            doc.text(`Institution: ${edu.institutionName}`, 10, yPosition + 10);
            doc.text(`Degree: ${edu.degree}`, 10, yPosition + 20);
            doc.text(`Graduation Year: ${edu.graduationYear}`, 10, yPosition + 30);
            yPosition += 40;
        });

        doc.save(`${formData.fullName}_CV.pdf`);
    };

    return (
        <div className="gradient-background">
            <div className="form-container">
                <h2 className="fw-bold text-uppercase mb-4 text-center">Build Your CV</h2>
                <Form>
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

                    {/* Email */}
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

                    {/* Phone Number */}
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

                    {/* Professional Summary */}
                    <Form.Group as={Col} className="mb-3" controlId="formProfessionalSummary">
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

                    {/* Skills */}
                    <Form.Group as={Col} className="mb-3" controlId="formSkills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Enter your skills"
                            name="skills"
                            value={formData.skills.join(', ')}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })}
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

                    {/* Education Section */}
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

                    <div className="d-grid mt-4">
                        <Button variant="primary" onClick={handleDownload}>
                            Download CV
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CVBuilderForm;
