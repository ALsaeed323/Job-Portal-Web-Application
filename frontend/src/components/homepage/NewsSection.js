import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const NewsSection = () => {
  return (
    <div style={{ backgroundColor: '#FDEAE5', padding: '60px 0' }}>
      <Container>
        <h2>Offers News</h2>
        <Row className="mt-4">
          <Col md={6}>
            <Card style={{ border: 'none' }}>
              <Card.Img variant="top" src="/path/to/your/image.jpg" />
              <Card.Body>
                <Card.Title>Maecenas non porttitor quam</Card.Title>
                <Card.Text>News Daily - Read more</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ border: 'none' }}>
              <Card.Body>
                <Card.Title>Sed nibh eros rhoncus vestibulum ultricies arcu</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna mi, sagittis at metus eu, scelerisque fringilla sapien.
                </Card.Text>
                <Card.Text>Offers News - Read more</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsSection;
