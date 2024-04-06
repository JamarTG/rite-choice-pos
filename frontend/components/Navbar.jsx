import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../contexts/auth";

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
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          💧 Rite Choice Water and Delight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthorized && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/pos">
                  Point of Sales
                </Nav.Link>
                {isAuthorized && (
                  <>
                    <Nav.Link as={NavLink} to="/product-management">
                      Inventory Management
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/report-generation">
                      Report Generation
                    </Nav.Link>

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
                      Logout
                    </Link>
                  </>
                )}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationalBar;
