import React from "react";
import SalesReport from "../components/SalesReport.jsx";
import { useAuth } from "../contexts/auth.jsx";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }
 

  return (
    <SalesReport/>
  );
};

export default App;
