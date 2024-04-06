import React from 'react';

const TransactionReport = ({ transactions }) => {
  return (
    <div>
      <h2>Transaction Report</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.customer}</td>
              <td>${transaction.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionReport;
