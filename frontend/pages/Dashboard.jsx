import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

function Homepage() {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1>🚧 Page Under Construction 🚧</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
