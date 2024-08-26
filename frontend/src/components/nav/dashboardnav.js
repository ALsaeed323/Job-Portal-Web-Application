import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { useAuth as useEmployerAuth } from '../../context/EmployerContext';
import { useAuth as useEmployeeAuth } from '../../context/EmployeeContext';

const Header = () => {
  const { logout: employerLogout } = useEmployerAuth();
  const { logout: employeeLogout } = useEmployeeAuth();
  const { user: employerUser } = useEmployerAuth();
  const { user: employeeUser } = useEmployeeAuth();
  
  console.log("userrrrrrrrrrr"+employerUser.userType);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (employerUser.userType==="employer") {
      employerLogout();
      navigate("/signin-employer"); // Redirect to the employer sign-in page after logging out
    } else if (employeeUser.userType==="employee") {
      employeeLogout();
      navigate("/signin-employee"); // Redirect to the employee sign-in page after logging out
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Logo />
        <Navbar.Brand as={Link} to="/">
          <b> Job Portal</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
