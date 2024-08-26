import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "ALL Jobs",
    href: "/dashboard/jobslist",
    
  },
  {
    title: "Create Position",
    href: "/dashboard/Createposting",
    icon: "bi bi-bell",
  },
  {
    title: "Applications",
    href: "/dashboard/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "CVBuild",
    href: "/dashboard/CVBuild",
    icon: "bi bi-patch-check",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="custom-margin-top">
      <div className="p-3 mt-2" >
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
