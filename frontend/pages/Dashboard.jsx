import React from "react";
import { useAuth } from "../contexts/auth";
import {Navigate} from 'react-router-dom'
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAuthorized, isLoading } = useAuth();
  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }

  if(isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Rite Choice Water Store</h1>

      <div className="row">
        <div className="col-md-6">
          <h3>About Us</h3>
          <p>
            Welcome to Rite Choice Water Store, your one-stop shop for all your
            water needs. We offer a wide range of high-quality water products to
            keep you hydrated and healthy.
          </p>
          <p>
            Our mission is to provide clean and safe drinking water solutions
            for our community. We are committed to quality, sustainability, and
            customer satisfaction.
          </p>
        </div>

        <div className="col-md-6">
          <h3>Products</h3>
          <p>
            Check out our diverse range of water products including purified
            water, spring water, mineral water, and more.
          </p>
          <p>
            <strong>Featured Product:</strong> Premium Purified Water - Stay
            hydrated with our top-quality purified water.
          </p>

          <Link to="/pos" className="btn btn-primary">
            Use Point of Sale System
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
