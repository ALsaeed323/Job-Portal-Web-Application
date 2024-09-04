import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './navcss.css';
import { useAuth as useEmployerAuth } from "../../context/EmployerContext";
import { useAuth as useEmployeeAuth } from "../../context/EmployeeContext";

const NavigationBar = () => {
  const { user: employerUser } = useEmployerAuth();
  const { user: employeeUser } = useEmployeeAuth();

  // Determine the user status
  const user = employerUser || employeeUser;

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
            <Nav.Link as={Link} to="/" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/features" className="custom-nav-link">Features</Nav.Link>
            <Nav.Link as={Link} to="/about" className="custom-nav-link">About</Nav.Link>

            {!user ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-signin">
                  Sign In
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/signin-employer">
                    Sign in as Employer
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/signin-employee">
                    Sign in as Employee
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null} {/* Hide the dropdown when the user is logged in */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
