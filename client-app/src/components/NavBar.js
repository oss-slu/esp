import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function NavBarOrca() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src="logo_temp.png"
              width="50"
              height="50"
              className="d-inline-block align-center"
            />{' '}
            Log Data Extraction</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Link href="/orca">ORCA Log Extraction</Nav.Link>
            {/* <Nav.Link href="/temp"></Nav.Link>  */}
            <Nav.Link href="/gaussian">Gaussian Log Extraction</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarOrca;
