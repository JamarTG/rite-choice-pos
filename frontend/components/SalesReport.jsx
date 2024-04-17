import React, { useEffect, useState } from "react";

const ProductInventoryReport = () => {
  const [products, setProducts] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [includeOverview, setIncludeOverview] = useState(true);
  const [includeDetailedInfo, setIncludeDetailedInfo] = useState(true);
  const [includeTopSelling, setIncludeTopSelling] = useState(true);
  const [includeLowStock, setIncludeLowStock] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product-api/products");
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchReportData = async () => {
      try {
        const response = await fetch("http://localhost:3000/report-api/report");
        const data = await response.json();
        setReportData(data.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
    fetchProducts();
  }, []);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 100);
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h3 style={{textAlign:"center"}}>Rite Choice Water and Delight Performance Report</h3>
      <p style={{textAlign:"center"}}> Date : {new Date().toString()}</p>

      <br />
      <br />
      
      {!printing && (
        <>
          <h3>Sections</h3>
          <form>
            <ul style={{listStyleType:"none"}}>
              <li>
                <input
                  type="checkbox"
                  checked={includeOverview}
                  onChange={() => setIncludeOverview(!includeOverview)}
                />
                <label>Overview</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={includeDetailedInfo}
                  onChange={() => setIncludeDetailedInfo(!includeDetailedInfo)}
                />
                <label>Detailed Product Information</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={includeTopSelling}
                  onChange={() => setIncludeTopSelling(!includeTopSelling)}
                />
                <label>Top Selling Products</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={includeLowStock}
                  onChange={() => setIncludeLowStock(!includeLowStock)}
                />
                <label>Low Stock Products</label>
              </li>
            </ul>
          </form>

          <button className="btn btn-primary mb-4" onClick={handlePrint}>
            Print Report
          </button>
        </>
      )}

      {reportData ? (
        <>
          {includeOverview && (
            <>
              <h3 id="overview"> Overview</h3>
              <ul className="list-group mb-4">
                <li className="list-group-item">
                  Total Number of Products: {reportData.totalProducts}
                </li>
                <li className="list-group-item">
                  Total Quantity Sold: {reportData.totalQuantitySold}
                </li>
                <li className="list-group-item">
                  Total Revenue Generated: ${reportData.totalRevenue}
                </li>
                <li className="list-group-item">
                  Average Unit Price: ${reportData.averageUnitPrice}
                </li>
                <li className="list-group-item">
                  Average Stock Level: {reportData.averageStockLevel}
                </li>
                <li className="list-group-item">
                  Average Quantity Sold: {reportData.averageQuantitySold}
                </li>
              </ul>
            </>
          )}

          {includeDetailedInfo && (
            <>
              <h3 id="detailed-product-information">
                Detailed Product Information
              </h3>
              <table className="table table-striped mb-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Unit Price (USD)</th>
                    <th>Amount in Stock</th>
                    <th>Quantity Sold</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length
                    ? products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.type}</td>
                          <td>${product.unitPrice}</td>
                          <td>{product.amountInStock}</td>
                          <td>{product.quantitySold}</td>
                          <td>
                            <img
                              src={product.image}
                              alt={product.name}
                              width="50"
                              className="img-thumbnail"
                            />
                          </td>
                        </tr>
                      ))
                    : "No products available"}
                </tbody>
              </table>
            </>
          )}

          {includeTopSelling && (
            <>
              <h3 id="top-selling-products">Top Selling Products</h3>
              <div className="d-flex flex-wrap mb-4">
                {reportData.topSellingProducts.length ? (
                  reportData.topSellingProducts.map((product) => (
                    <div key={product.productId} className="mr-3 mb-3 d-flex">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ width: "5rem", height: "6rem" }}
                      />
                      <div className="card-body ">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="card-text">
                          Quantity Sold: {product.quantitySold}
                        </p>
                        <p className="card-text">
                          Revenue Generated: ${product.unitPrice * product.quantitySold}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Top Sellers Available</p>
                )}
              </div>
            </>
          )}

          {includeLowStock && (
            <>
              <ul className="list-group mb-4">
                <h3 id="low-stock-products">Low Stock Products</h3>
                {reportData.lowStockProducts.length ? (
                  reportData.lowStockProducts.map((product) => (
                    <li key={product.productId} className="list-group-item">
                      <strong>Product Name:</strong> {product.name} <br />
                      <span>Amount in Stock: {product.amountInStock}</span>
                    </li>
                  ))
                ) : (
                  <p>No Low Stack Products</p>
                )}
              </ul>
            </>
          )}
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ProductInventoryReport;
