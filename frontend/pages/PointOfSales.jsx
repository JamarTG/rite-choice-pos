import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

const PointOfSalesPage = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearchTerm("");
  };

  const handleAddProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p.id === product.id
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
          <span>${(product.price * product.quantity).toFixed(2)}</span>
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
      .reduce((total, product) => total + product.price * product.quantity, 0)
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

  const products = [
    {
      id: 1,
      name: "Natural Spring Water 500ml",
      category: "spring",
      price: 279.51,
    },
    {
      id: 2,
      name: "Purified Drinking Water 1L",
      category: "drinking",
      price: 209.37,
    },
    { id: 3, name: "Mineral Water 1.5L", category: "mineral", price: 419.25 },
    {
      id: 4,
      name: "Natural Spring Water 1L",
      category: "spring",
      price: 279.51,
    },
    {
      id: 5,
      name: "Purified Drinking Water 1.5L",
      category: "drinking",
      price: 209.37,
    },
    { id: 6, name: "Mineral Water 1L", category: "mineral", price: 419.25 },
    {
      id: 7,
      name: "Natural Spring Water 1.5L",
      category: "spring",
      price: 279.51,
    },
    {
      id: 8,
      name: "Purified Drinking Water 500ml",
      category: "drinking",
      price: 209.37,
    },
    { id: 9, name: "Mineral Water 500ml", category: "mineral", price: 419.25 },
  ];

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
                onClick={handleCategoryChange}
                value={category.id}
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
          <ul className="list-group">
            {products
              .filter(
                (product) =>
                  (selectedCategory === "all" ||
                    product.category === selectedCategory) &&
                  product.name.toLowerCase().includes(searchTerm)
              )
              .map((product) => (
                <li
                  key={product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <span style={{ flex: "0 0 50%" }}>{product.name}</span>
                  <span style={{ flex: "0 0 25%" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <div
                    className="input-group input-group-sm"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={selectedProducts.find(p => p.id === product.id)?.quantity || 1}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    /> */}
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
