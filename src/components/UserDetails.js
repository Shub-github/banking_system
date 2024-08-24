import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { state } = useLocation();
  const { user } = state; // Extract user data from state

  // Initialize transactionHistory state properly
  const [transactionHistory, setTransactionHistory] = useState(
    user.transactionHistory || []
  );

  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    currency: "USD",
  });

  const [balance, setBalance] = useState(user.initialBalance);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let customers = JSON.parse(sessionStorage.getItem("users")) || [];
    let customer2 = customers.find(
      (c) => c.accountNumber === formData.recipientAccountNumber
    );

    const { recipientAccountNumber, amount } = formData;
    const amountNumber = Number(amount);

    if (balance < amountNumber) {
      alert("Insufficient funds");
      return;
    }

    // Update balances
    user.initialBalance = balance - amountNumber;
    customer2.initialBalance = customer2.initialBalance + amountNumber;
    setBalance(user.initialBalance);

    // Create new transaction records
    const newTransaction = {
      amount: amountNumber,
      type: "debit",
      description: `Transfer to account ${recipientAccountNumber}`,
      timestamp: new Date().toLocaleString(),
    };

    const recipientTransaction = {
      amount: amountNumber,
      type: "credit",
      description: `Transfer from account ${user.accountNumber}`,
      timestamp: new Date().toLocaleString(),
    };

    // Update transaction histories
    const updatedUserTransactions = [...transactionHistory, newTransaction];

    const updatedRecipientTransactions = [
      ...(customer2.transactionHistory || []),
      recipientTransaction,
    ];

    // Update users' transaction histories
    user.transactionHistory = updatedUserTransactions;
    customer2.transactionHistory = updatedRecipientTransactions;

    // Update state
    setTransactionHistory(updatedUserTransactions);

    // Save updated users to session storage
    customers = customers.map((c) =>
      c.accountNumber === user.accountNumber
        ? user
        : c.accountNumber === customer2.accountNumber
        ? customer2
        : c
    );
    sessionStorage.setItem("users", JSON.stringify(customers));

    toast.success("Funds transferred successfully");
  };

  return (
    <div className="flex flex-col w-11/12 max-w-[1160px] py-12 mx-auto gap-y-12">
      <div className="w-full flex justify-between gap-x-12">
        <div className="w-7/12 max-w-[450px]">
          <div className="relative w-auto overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Account Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Balance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.accountNumber}</td>
                  <td className="px-6 py-4">${balance}</td>
                  <td className="px-6 py-4">{user.isActive ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Transaction History Table */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
            <div className="relative w-auto overflow-x-auto rounded-md">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        {transaction.type === "debit"
                          ? `- $${transaction.amount}`
                          : `+ $${transaction.amount}`}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4">{transaction.description}</td>
                      <td className="px-6 py-4">{transaction.timestamp}</td>
                    </tr>
                  ))}
                  {transactionHistory.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="relative w-5/12 max-w-[450px]">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Transfer Funds
            </h2>

            <div className="mb-4">
              <label
                htmlFor="recipientAccountNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Recipient Account Number
              </label>
              <input
                type="text"
                name="recipientAccountNumber"
                placeholder="Recipient Account Number"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-medium mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="currency"
                className="block text-gray-700 font-medium mb-2"
              >
                Currency
              </label>
              <select
                name="currency"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Transfer Funds
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
