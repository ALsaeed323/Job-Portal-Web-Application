import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import JobService from '../../services/JobService';
import { useAuth } from '../../context/EmployerContext';

const JobListingsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await JobService.getAllJobs();
        const userJobs = allJobs.filter(job => job.userId === user._id);
        setJobs(userJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user._id]);


  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Requirements</th>
              <th>Application Deadline</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{job.description}</td>
                <td>{job.requirements}</td>
                <td>{job.applicationDeadline || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No job postings found.</p>
      )}

    </Container>
    
  );
};

export default JobListingsPage;
