import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../contexts/auth";
import cart from "../src/assets/cart.svg";
function NavigationalBar() {
  const { handleLogout } = useLogout();
  const { isAuthorized } = useAuth();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        position: "sticky",
        bottom: 0,
      }}
    >
      <Container style={{ marginTop: "30px" }}>
        <Navbar.Brand as={NavLink} to="/">
          💧 Rite Choice Water and Delight
  
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <>
            <Nav className="me-auto">
              {isAuthorized ? (
                <>
                  <Nav.Link as={NavLink} to="/product-management">
                    manage inventory
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/report-generation">
                    view live report
                  </Nav.Link>
                </>
              ) : (
                <>
                  {/* <Nav.Link as={NavLink} to="/">
                    Home
                  </Nav.Link> */}
                  <Nav.Link as={NavLink} to="/pos">
                   visit store
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ml-auto">
              {isAuthorized ? (
                <Link
                  onClick={handleLogout}
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#333",
                    borderRadius: "5px",
                    padding: "8px 15px",
                    marginLeft: "10px",
                    transition: "background-color 0.3s ease",
                    textDecoration: "none",
                  }}
                  activeStyle={{
                    backgroundColor: "#c82333",
                  }}
                >
                  logout
                </Link>
              ) : (
                <Nav.Link
                  as={NavLink}
                  to="/auth"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#333",
                    borderRadius: "5px",
                    padding: "8px 15px",
                    marginLeft: "10px",
                    transition: "background-color 0.3s ease",
                    textDecoration: "none",
                  }}
                >
                  login
                </Nav.Link>
              )}
            </Nav>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationalBar;
