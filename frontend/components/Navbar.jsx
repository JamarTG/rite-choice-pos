import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationalBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/"><img src="./bottledwater.svg" alt="" />  Rite Choice Water</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
            <Nav.Link as={NavLink} to="/pos">Point of Sales</Nav.Link>
            <Nav.Link as={NavLink} to="/product-management">Inventory Management</Nav.Link>
            <Nav.Link as={NavLink} to="/report-generation">Report Generation</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationalBar;
