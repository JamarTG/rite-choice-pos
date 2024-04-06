import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import ProductManagement from "../pages/ProductManagement.jsx";
import ReportGeneration from "../pages/ReportGeneration.jsx";
import Auth from "../components/Auth.jsx";
import PointOfSalesPage from "../pages/PointOfSales.jsx";
import { AuthProvider } from "../contexts/auth.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/pos" element={<PointOfSalesPage />} />
          <Route path="/report-generation" element={<ReportGeneration />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
     
      </Router>
    </AuthProvider>
  );
}

export default App;
