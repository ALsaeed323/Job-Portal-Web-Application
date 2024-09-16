// src/pages/EmployeeApplications.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Collapse, Card } from 'react-bootstrap';
import JobService from '../services/JobService';
import { useAuth } from '../context/EmployeeContext';
import '../components/Job/EmployeeApplications.css';

const EmployeeApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({}); // State to control which description is open

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const employeeApplications = await JobService.getEmployeeApplications(user._id);
        setApplications(employeeApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleToggle = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="gradient-backgroundd">
      <Container>
        <h1>Your Applications</h1>
        {applications.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <React.Fragment key={application._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{application.jobId.title}</td>
                    <td>{application.jobId.companyName}</td>
                    <td>{application.jobId.location}</td>
                    <td>{application.status || 'Pending'}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleToggle(application._id)}
                      >
                        {open[application._id] ? 'Hide Details' : 'Show Details'}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <Collapse in={open[application._id]}>
                        <Card>
                          <Card.Body>
                            <h5>Job Description</h5>
                            <p>{application.jobId.description || 'No description available'}</p>
                            <h5>Requirements</h5>
                            <p>{application.jobId.requirements || 'No requirements listed'}</p>
                          </Card.Body>
                        </Card>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No applications found.</p>
        )}
      </Container>
    </div>
  );
};

export default EmployeeApplications;
