import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cart from "../src/assets/cart.svg"

const recommendations = [
  {
    id: 1,
    name: "John Doe",
    comment: "Great service and fast delivery!",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Highly recommend their products!",
  },
  {
    id: 3,
    name: "Alice Johnson",
    comment: "Excellent customer support!",
  },
];

const CustomerRecommendations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === recommendations.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {recommendations.map((recommendation, index) => (
        <div
          key={recommendation.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
        >
          <h3>{recommendation.name}</h3>
          <p>{recommendation.comment}</p>
        </div>
      ))}
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      className="container mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <div className="row">
        <div className="col-md-6">
          <h3>Who are we?</h3>
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dbottled%2Bwater&psig=AOvVaw1SUgvC0GNyzxkqn_ByrIiB&ust=1713300419625000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDO5IiMxYUDFQAAAAAdAAAAABAJ"
            alt=""
          />
          <p>
            We are Rite Choice Water and Delight, a small water business located
            in Hayes Clarendon and the one-stop shop for all your water needs.
            We offer a wide range of high-quality waterproducts to keep you
            hydrated and healthy.
          </p>
          <p>
            Our mission is to provide clean and safe drinking water solutions
            for our community. We are committed to quality, sustainability, and
            customer satisfaction.
          </p>
        </div>

        <div
          className="col-md-6"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomerRecommendations />
          <div style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/pos"
              className="btn btn-primary"
              style={{
                backgroundColor: "#007bff",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
               <img src={cart} width={20} height={20} alt="" /> Visit Our Store
            </Link>

            <Link
              to="tel:+18768822225"
              className="btn btn-primary button-pulse"
              style={{
                backgroundColor: "#333",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Call Us at (876) 882-2225
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
