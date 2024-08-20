import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FeatureSection = () => {
  return (
    <div style={{ padding: '60px 0' }}>
      <Container>
        <h2>Unique commercial offer for your business</h2>
        <Row className="mt-4">
          <Col md={6}>
            <Card style={{ border: 'none' }}>
              <Card.Body>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae risus. Nullam nulla elit, tristique turpis.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <img
              src="/path/to/your/image.jpg"
              alt="Feature"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeatureSection;
