import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <div style={{ backgroundColor: '#5A1766', color: 'white', padding: '100px 0' }}>
      <Container>
        <Row>
          <Col md={6}>
            <h1>Job Offers Registration</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna mi, sagittis at metus eu,
              scelerisque fringilla sapien. Aenean in consectetur leo.
            </p>
            <Button variant="outline-light">Read More</Button>
          </Col>
          <Col md={6}>
            <img
              src="/path/to/your/image.jpg"
              alt="Hero"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
