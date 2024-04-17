import React, { useState } from "react";
import "./CheckoutPage.css";

const CheckoutPage = ({ total, setShowCheckout, selectedProducts }) => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    cardNumber: "1234 5678 9012 3456",
    expDate: "12/23",
    cvc: "123",
  });
  const [orderNumber, setOrderNumber] = useState(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function generateOrderNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    const orderNumber = `ORD-${randomNumber.toString().padStart(9, "0")}`;
    return orderNumber;
  }

  const handlePayment = async () => {
    try {
      const products = selectedProducts.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      }));

      const response = await fetch(
        "http://localhost:3000/product-api/products/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrderNumber(generateOrderNumber());
        setShowConfirmationMessage(true);
      } else {
        console.error(`Error recording payment: ${data.message}`);
      }
    } catch (error) {
      console.error("Error recording payment:", error);
    }
  };

  return (
    <div className="checkout-container" style={{ marginTop: "100px" }}>
      <h5>Pay with Card </h5>
      <form className="checkout-form">
        <div className="form-group" style={{ display: "flex", gap: "10px" }}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ display: "flex", gap: "10px" }}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ display: "flex", gap: "10px" }}>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              placeholder="Enter zip code"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ display: "flex", gap: "10px" }}>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter card number"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expDate">Expiration Date</label>
            <input
              type="text"
              id="expDate"
              name="expDate"
              placeholder="MM/YY"
              value={formData.expDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              placeholder="CVC"
              value={formData.cvc}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {showConfirmationMessage && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h3>Thank you for shopping with us!</h3>
              <p>
                Your order <strong>#{orderNumber}</strong> has been
                successfully processed.
              </p>
              <p>Transaction recorded. Total amount: ${total}</p>

              <button
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
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setShowCheckout(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
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
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            if (
              formData.lastName &&
              formData.firstName &&
              formData.email &&
              formData.state &&
              formData.city &&
              formData.zip &&
              formData.cardNumber &&
              formData.expDate &&
              formData.cvc
            ) {
              handlePayment();
            }
          }}
        >
          Pay ${total}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
