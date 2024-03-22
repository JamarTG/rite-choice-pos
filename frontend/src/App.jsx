import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ProductManagement from "../components/ProductManagement";
import ReportGeneration from "../components/ReportGeneration";
import SalesTrackingPage from "../components/PointOfSales";
import PointOfSalesPage from "../components/PointOfSales";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route path="/product-management" element={<ProductManagement/>}/>
          <Route path="/pos" element={<PointOfSalesPage/>} />
          <Route path="/report-generation" element={<ReportGeneration/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
