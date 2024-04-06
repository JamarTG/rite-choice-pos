import React, { useEffect, useState } from "react";

const ProductInventoryReport = () => {
  const [products, setProducts] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/product-api/products"
        );
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

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        RiteChoice Water Store Product Inventory Report
      </h1>
      <h4 className="text-center mb-4">Report Date: April 5, 2024</h4>

      <h3>Report Overview</h3>
      <p>
        This report provides a detailed analysis of the products available in
        the inventory, including sales performance, stock levels, and revenue
        generated.
      </p>

      <ol>
        <li>
          <a href="#overview">Overview</a>
        </li>
        <li>
          <a href="#product-summary">Product Summary</a>
        </li>
        <li>
          <a href="#detailed-product-information">
            Detailed Product Information
          </a>
        </li>
        <li>
          <a href="#top-selling-products">Top Selling Products</a>
        </li>
        <li>
          <a href="#low-stock-products">Low Stock Products</a>
        </li>
      </ol>

      {reportData ? (
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
          <h3 id="top-selling-products">Top Selling Products</h3>
          <div
            className="d-flex flex-wrap mb-4"
            style={{ justifyContent: "center", justifyContent: "space-evenly" }}
          >
            {reportData.topSellingProducts.length ? (
              reportData.topSellingProducts.map((product) => (
                <div key={product.productId} className=" mr-3 mb-3 d-flex">
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
                     Revenue Generated: $
                      {product.unitPrice * product.quantitySold}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Top Sellers Available</p>
            )}
          </div>
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
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ProductInventoryReport;