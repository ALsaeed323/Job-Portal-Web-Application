import { React, useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./navcss.css";
import { useAuth as useEmployerAuth } from "../../context/EmployerContext";
import { useAuth as useEmployeeAuth } from "../../context/EmployeeContext";

const NavigationBar = () => {
  const { user: employerUser } = useEmployerAuth();
  const { user: employeeUser } = useEmployeeAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Update the user based on employerUser or employeeUser
    if (employerUser) {
      setUser(employerUser);
    } else if (employeeUser) {
      setUser(employeeUser);
    } else {
      setUser(null);
    }
  }, [employerUser, employeeUser]);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      {" "}
      {/* Added fixed="top" */}
      <Container>
        <Logo />
        <Navbar.Brand as={Link} to="/">
          <b> Job Portal</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="custom-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/features" className="custom-nav-link">
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="custom-nav-link">
              About
            </Nav.Link>
            {!user ? (
        <>
          <Nav.Link
            as={Link}
            to="/signup-employee-initial"
            className="custom-nav-link"
          >
            Sign Up
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/signin-employer" // corrected the double slashes to single
            className="custom-nav-link"
          >
            Sign In
          </Nav.Link>
        </>
      ) : null}
            {/* Hide the dropdown when the user is logged in */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
