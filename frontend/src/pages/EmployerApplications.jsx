// src/pages/EmployerApplications.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import JobService from '../services/JobService';
import { useAuth } from '../context/EmployerContext';
import '../components/Job/EmployeeApplications.css';

const EmployerApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const employerApplications = await JobService.getEmployerApplications(user._id);
        setApplications(employerApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user._id]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const updatedApplication = await JobService.updateApplicationStatus(applicationId, status);
      setApplications(prevApplications =>
        prevApplications.map(application =>
          application._id === updatedApplication._id ? updatedApplication : application
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDownloadCV = async (applicationId) => {
    try {
      const response = await JobService.downloadEmployeeCV(applicationId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${applicationId}_CV.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading CV:', error);  // log any errors
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-backgrounde">
      <Container>
        <h1>Job Applications</h1>
        {applications.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Actions</th>
                <th>CV</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application._id}>
                  <td>{index + 1}</td>
                  <td>{application.employeeId.fullName}</td>
                  <td>{application.jobId.title}</td>
                  <td>{application.status}</td>
                  <td>
                    {application.status === 'Pending' && (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleStatusChange(application._id, 'Accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleStatusChange(application._id, 'Denied')}
                          className="ms-2"
                        >
                          Deny
                        </Button>
                      </>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleDownloadCV(application._id)}
                    >
                      Download CV
                    </Button>
                  </td>
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

export default EmployerApplications;
