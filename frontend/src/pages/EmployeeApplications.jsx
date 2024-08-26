// src/pages/EmployeeApplications.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import JobService from '../services/JobService';
import { useAuth } from '../context/EmployeeContext';
import '../components/Job/EmployeeApplications.css';

const EmployeeApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="gradient-background">
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
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <td>{index + 1}</td>
                <td>{application.jobId.title}</td>
                <td>{application.jobId.companyName}</td>
                <td>{application.jobId.location}</td>
                <td>{application.status || 'Pending'}</td>
              </tr>
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
