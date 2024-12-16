import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import { useState } from "react";
import { useLocation , Link} from "react-router-dom";

function NavBarOrca() {
  const location = useLocation();
  //const [activeKey, setActiveKey] = useState(location.pathname);
  /*
  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };
  */

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      data-bs-theme="dark"
      className="bg-body-tertiary">
      <Container>
      <Navbar.Brand as={Link} to="/" className="logo-title">
          <img
            alt="App Logo"
            src="logo_temp.png"
            width="50"
            height="50"
            className="d-inline-block align-center me-2"
          />
          <span>Log Data Extraction</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav Nav activeKey={location.pathname}>
            <Nav.Link href="/orca">ORCA Log Extraction</Nav.Link>
            <Nav.Link href="/gaussian">Gaussian Log Extraction</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarOrca;
