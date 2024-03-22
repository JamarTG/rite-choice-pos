import React from "react";
import TransactionReport from "./TransactionReport";
import InventoryReport from "./InventoryReport";

const App = () => {
  const transactions = [
    { id: 1, date: "2024-03-01", customer: "John Doe", totalAmount: 150.25 },
    { id: 2, date: "2024-03-02", customer: "Jane Smith", totalAmount: 200.5 },
    {
      id: 3,
      date: "2024-03-03",
      customer: "Alice Johnson",
      totalAmount: 100.75,
    },
  ];

  const inventory = [
    {
      id: 1,
      productName: "Product A",
      quantity: 50,
      unitPrice: 10.99,
      supplier: "Supplier X",
      description: "Description of Product A",
      category: "Category A",
    },
    {
      id: 2,
      productName: "Product B",
      quantity: 30,
      unitPrice: 15.99,
      supplier: "Supplier Y",
      description: "Description of Product B",
      category: "Category B",
    },
    {
      id: 3,
      productName: "Product C",
      quantity: 25,
      unitPrice: 12.99,
      supplier: "Supplier Z",
      description: "Description of Product C",
      category: "Category C",
    },
  ];

  const currentDate = new Date().toLocaleString();

  return (
    // <div className="container mt-5">
    //   <p>Sales and Inventory Report</p>
    //   <p>{currentDate}</p>
    //   <p>John Smith</p>
    //   <p>1.0</p>
    //   <TransactionReport transactions={transactions} />
    //   <InventoryReport inventory={inventory} />
    // </div "100vh",
    //   }}div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>🚧 Page Under Construction 🚧</h1>
    </div>
  );
};

export default App;
