import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { useAuth as useEmployerAuth } from '../context/EmployerContext';
import { useAuth as useEmployeeAuth } from '../context/EmployeeContext';

const Sidebar = () => {
  const { user: employerUser, loading: employerLoading } = useEmployerAuth();
  const { user: employeeUser, loading: employeeLoading } = useEmployeeAuth();
  const location = useLocation();

  const user = employerUser || employeeUser;
  const loading = employerLoading || employeeLoading;

  if (loading) {
    return null; // Show nothing while loading
  }

  // Define the navigation based on the user type
  const navigation = user?.userType === "employer" ? [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "bi bi-speedometer2",
    },
    {
      title: "All Jobs",
      href: "/dashboard/jobslist",
      icon: "bi bi-briefcase",
    },
    {
      title: "Create Position",
      href: "/dashboard/Createposting",
      icon: "bi bi-plus-circle",
    },
    {
      title: "Applications",
      href: "/dashboard/badges",
      icon: "bi bi-file-earmark-text",
    },
  ] : user?.userType === "employee" ? [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "bi bi-speedometer2",
    },
    {
      title: "CV Build",
      href: "/dashboard/CVBuild",
      icon: "bi bi-person-badge",
    },
    {
      title: "Applications",
      href: "/dashboard/badges",
      icon: "bi bi-patch-check",
    },
  ] : [];

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => document.getElementById("sidebarArea").classList.toggle("showSidebar")}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="custom-margin-top">
        <div className="p-3 mt-2">
          <Nav vertical className="sidebarNav">
            {navigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
