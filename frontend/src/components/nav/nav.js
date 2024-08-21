import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">  {/* Added fixed="top" */}
      <Container>
        <Logo />
        <Navbar.Brand as={Link} to="/">
          <b> Job Portal</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Button as={Link} to="/get-started" variant="outline-primary">
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
