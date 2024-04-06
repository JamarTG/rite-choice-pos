import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white py-3"
   
      style={{
        position: "fixed",
        bottom: 0,
        height: "40px",
        width: "100%",
      }}
    >
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} Water Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
