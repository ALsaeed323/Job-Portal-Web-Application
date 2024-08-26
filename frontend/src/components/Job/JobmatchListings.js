import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import JobService from '../../services/JobService';
import { useAuth } from '../../context/EmployeeContext';

const JobListingsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userJobs = await JobService.jobMatching(user._id);
        setJobs(userJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user._id]);

  const handleApply = async (jobId) => {
    try {
      await JobService.applyForJob(jobId, user._id);
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert(error.response?.data?.message || 'An error occurred while applying.');
    }
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
              <th>Apply</th>
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
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleApply(job._id)}
                    disabled={job.applied} // Optionally disable if already applied
                  >
                    Apply
                  </Button>
                </td>
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
