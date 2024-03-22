import React from 'react';

const InventoryReport = ({ inventory }) => {
  return (
    <div>
      <h2>Inventory Report</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice}</td>
              <td>{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryReport;
