import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

const PointOfSalesPage = () => {
  const { isAuthorized, isLoading } = useAuth();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/product-api/products"
        );
        const fetchedProducts = await response.json();

        setProducts(fetchedProducts.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");
  };

  const handleAddProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[existingProductIndex].quantity++;
      setSelectedProducts(updatedSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts.filter((p) => p.quantity > 0));
  };

  const clearAllProducts = () => {
    setSelectedProducts([]);
  };

  const generateReceipt = () => {
    const receiptContent = selectedProducts.map((product) => (
      <div
        key={product.id}
        className="d-flex justify-content-between align-items-center receipt-item"
      >
        <div>
          <span>{product.name}</span>
          <div className="d-flex align-items-center">
            <input
              type="number"
              min="1"
              className="form-control quantity-input mx-2"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span>${product.unitPrice * product.quantity}</span>
          <button
            className="btn btn-sm btn-secondary ml-2"
            onClick={() => handleQuantityChange(product.id, 0)}
          >
            x
          </button>
        </div>
      </div>
    ));

    const total = selectedProducts
      .reduce(
        (total, product) => total + product.unitPrice * product.quantity,
        0
      )
      .toFixed(2);

    return (
      <div className="receipt mt-4 p-3 border rounded">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Rite Choice Water and Delight</h5>
          <small>12-23-34 4:00PM</small>
        </div>
        {receiptContent}
        <div className="d-flex justify-content-between mt-3">
          <span>
            <b>Total:</b>
          </span>
          <span>${total}</span>
        </div>
        <button
          className="btn btn-primary btn-block mt-3"
          onClick={() => alert(`Transaction recorded. Total $${total}`)}
        >
          Proceed to checkout
        </button>
        <button
          className="btn btn-danger btn-block mt-2"
          onClick={clearAllProducts}
        >
          Clear All Products
        </button>
      </div>
    );
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "spring", name: "Spring Water" },
    { id: "drinking", name: "Drinking Water" },
    { id: "mineral", name: "Mineral Water" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h4 className="mb-3">Categories</h4>
          <div className="list-group">
          
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`list-group-item list-group-item-action ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          <div className="d-flex justify-content-between mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>

      
            {products
              .filter((product) => {
                return (
                  selectedCategory === "all" ||
                  (product.type === selectedCategory &&
                    product.name.toLowerCase().includes(searchTerm))
                );
              })
              .map((product) => (
                <li
                  key={product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <span style={{ flex: "0 0 50%" }}>{product.name}</span>
                  <span style={{ flex: "0 0 25%" }}>
                    ${product.unitPrice.toFixed(2)}
                  </span>
                  <div
                    className="input-group input-group-sm"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddProduct(product)}
                    >
                      <img src="/cart.svg" alt="Shopping Cart" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          {selectedProducts.length > 0 ? (
            generateReceipt()
          ) : (
            <p className="text-center">No items selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointOfSalesPage;
