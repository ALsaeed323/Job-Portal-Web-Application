import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./logoutbutton.css";
import { useAuth as useEmployerAuth } from "../../context/EmployerContext";
import { useAuth as useEmployeeAuth } from "../../context/EmployeeContext";

const Header = () => {
  const { logout: employerLogout, user: employerUser } = useEmployerAuth();
  const { logout: employeeLogout, user: employeeUser } = useEmployeeAuth();

  const handleLogout = () => {
    if (employerUser && employerUser.userType === "employer") {
      employerLogout();
    }
    if (employeeUser && employeeUser.userType === "employee") {
      employeeLogout();
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
            <Nav.Link as={Link} to="/home" className="custom-nav-link">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className="custom-nav-link">
              About
            </Nav.Link>

            {(employerUser || employeeUser) && (
              <Button
                variant="outline-primary"
                className="custom-logout-button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
