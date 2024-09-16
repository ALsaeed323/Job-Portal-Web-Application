import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import JobService from '../../services/JobService';
import { useAuth } from '../../context/EmployeeContext';
import '../../components/Job/EmployeeApplications.css';

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
    <div className="gradient-backgroundeee">
      <Container>
        <h1>Job Listings</h1>
        {jobs.length > 0 ? (
          <Row>
            {jobs.map((job, index) => (
              <Col md={6} lg={4} key={job._id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.companyName} - {job.location}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Description:</strong> {job.description.length > 100 ? job.description.slice(0, 100) + '...' : job.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Requirements:</strong> {job.requirements.length > 100 ? job.requirements.slice(0, 100) + '...' : job.requirements}
                    </Card.Text>
                    <Card.Text>
                      <strong>Application Deadline:</strong> {job.applicationDeadline || 'N/A'}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleApply(job._id)}
                      disabled={job.applied} // Optionally disable if already applied
                    >
                      Apply
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No job postings found.</p>
        )}
      </Container>
    </div>
  );
};

export default JobListingsPage;
