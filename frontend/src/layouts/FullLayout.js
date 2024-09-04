import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from '../components/nav/dashboardnav'
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex" style={{ backgroundColor: '#D9D8D3' }}>

        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
