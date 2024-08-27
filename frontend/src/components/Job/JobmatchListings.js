import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import JobService from '../../services/JobService';
import { useAuth } from '../../context/EmployeeContext';

const JobListingsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      try {
        const userJobs = await JobService.jobMatching(user._id);
        const employeeApplications = await JobService.getEmployeeApplications(user._id);

        // Extract job IDs from the employee applications
        const appliedJobIds = employeeApplications.map(application => application.jobId._id);

        // Filter out the jobs that have already been applied to
        const filteredJobs = userJobs.filter(job => !appliedJobIds.includes(job._id));

        setJobs(filteredJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndApplications();
  }, [user._id]);

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
                  {/* Apply button logic can go here */}
                  <Button variant="primary">Apply</Button>
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
