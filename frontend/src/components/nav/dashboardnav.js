import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { useAuth  } from "../../context/EmployerContext";

const NavigationBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/signin"); // Redirect to the sign-in page after logging out
      };
    
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
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Button as={Link} to="/get-started" variant="outline-primary"  onClick={handleLogout}>
              Logout 
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
