import React, { useState } from "react";

const PointOfSalesPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
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

  const handleReduceQuantity = (productId) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts.filter(p => p.quantity > 0));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const generateReceipt = () => {
    const receiptContent = selectedProducts.map((product, index) => (
      <div key={index} className="mb-3">
        <span style={{ display: "flex"}}>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleReduceQuantity(product.id)}
          >
            -
          </button>
          <p style={{ margin:"10px",height:"5px", display: "flex",justifyContent:"center",alignItems:"center"}}>{product.quantity}</p>
          
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleIncreaseQuantity(product.id)}
          >
            +
          </button>
        </span>
        <span>
          {product.name} - ${product.price.toFixed(2)}
        </span>
      </div>
    ));
    return (
      <div style={{ border: "1px solid lightgrey", borderRadius: "5px", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <b>Rite Choice Water Store</b>
          <small>12-23-34 4:00PM</small>
        </div>

        <ul>{receiptContent}</ul>
        <p>
          Total: $
          {selectedProducts
            .reduce(
              (total, product) => total + product.price * product.quantity,
              0
            )
            .toFixed(2)}
        </p>
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={() => console.log("transaction recorded")}
        >
          Proceed to checkout
        </button>
      </div>
    );
  };

  const products = [
    { id: 1, name: "Natural Spring Water 500ml", price: 279.51 },
    { id: 2, name: "Purified Drinking Water 1L", price: 209.37 },
    { id: 3, name: "Mineral Water 1.5L", price: 419.25 },
    { id: 4, name: "Natural Spring Water 1L", price: 279.51 },
    { id: 5, name: "Purified Drinking Water 1.5L", price: 209.37 },
    { id: 6, name: "Mineral Water 1L", price: 419.25 },
    { id: 7, name: "Natural Spring Water 1.5L", price: 279.51 },
    { id: 8, name: "Purified Drinking Water 500ml", price: 209.37 },
    { id: 9, name: "Mineral Water 500ml", price: 419.25 },
  ];

  return (
    <div className="container mt-5">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="row">
        <div className="col-md-6">
          <ul>
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm)
              )
              .slice(0, 5)
              .map((product) => (
                <p key={product.id} className="mb-4">
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => handleAddProduct(product)}
                  >
                    <img src="/cart.svg" alt="Shopping Cart" />
                  </button>
                  {product.name} - ${product.price.toFixed(2)}{" "}
                </p>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <hr />
          {selectedProducts.length > 0 && generateReceipt()}
        </div>
      </div>
    </div>
  );
};

export default PointOfSalesPage;
