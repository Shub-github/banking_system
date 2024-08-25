import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { EXCHANGE_API } from "../utils/constant";

const UserDetails = () => {
  const { state } = useLocation();
  const { user } = state; // Extract user data from state
  const [currency, setCurrency] = useState("USD");
  const [transactionHistory, setTransactionHistory] = useState(
    user.transactionHistory || []
  );
  const [balance, setBalance] = useState(user.initialBalance);
  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    currency: "USD",
  });

  useEffect(() => {
    fetchExchangeRates(formData.currency);
  }, [formData.currency]);

  const fetchExchangeRates = async (currency) => {
    try {
      console.log("=======user===>", EXCHANGE_API);
      const response = await fetch(`${EXCHANGE_API}&symbols=${currency}`);
      const data = await response.json();
      console.log("=======currency====>", currency);
      return data.rates;
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      toast.error("Failed to fetch exchange rates.");
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { recipientAccountNumber, amount, currency } = formData;
    const amountNumber = Number(amount);

    let customers = JSON.parse(sessionStorage.getItem("users")) || [];
    const customer2 = customers.find(
      (c) => c.accountNumber === recipientAccountNumber
    );

    if (!customer2) {
      toast.error("Recipient account not found.");
      return;
    }

    // Fetch the exchange rates
    const rates = await fetchExchangeRates(currency);
    if (!rates) return;

    // Convert the amount to the base currency (USD)
    const conversionRate = rates[currency] || 1;
    const convertedAmount = (amountNumber / conversionRate) * 0.99;
    console.log("===amountNumber====>", amountNumber);
    console.log("===conversionRate====>", conversionRate);
    console.log("====convertedAmount===>", convertedAmount);

    if (balance < convertedAmount) {
      toast.error("Insufficient funds");
      return;
    }

    // Update balances
    const newBalance = balance - convertedAmount;
    // const recipientNewBalance = customer2.initialBalance + amountNumber;
    const recipientNewBalance = customer2.initialBalance + convertedAmount;

    setBalance(newBalance);

    // Create new transaction records
    const newTransaction = {
      amount: amountNumber.toFixed(2),
      type: "debit",
      description: `Transfer to account ${recipientAccountNumber}`,
      timestamp: new Date().toLocaleString(),
    };

    const recipientTransaction = {
      amount: convertedAmount.toFixed(2),
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

    // Update user and recipient data
    user.initialBalance = newBalance;
    user.transactionHistory = updatedUserTransactions;
    customer2.initialBalance = recipientNewBalance;
    customer2.transactionHistory = updatedRecipientTransactions;

    // Update session storage
    customers = customers.map((c) =>
      c.accountNumber === user.accountNumber
        ? user
        : c.accountNumber === customer2.accountNumber
        ? customer2
        : c
    );
    sessionStorage.setItem("users", JSON.stringify(customers));

    // Update state
    setTransactionHistory(updatedUserTransactions);
    setFormData({ recipientAccountNumber: "", amount: "", currency: "USD" });
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
                  <td className="px-6 py-4">${balance.toFixed(2)}</td>
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
                          ? `- ${transaction.amount} ${currency}`
                          : `+ ${transaction.amount} ${currency}`}
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

        {/* Transfer Form */}
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
                className="text-sm font-medium"
              >
                Recipient Account Number
              </label>
              <input
                type="text"
                id="recipientAccountNumber"
                name="recipientAccountNumber"
                value={formData.recipientAccountNumber}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="currency" className="text-sm font-medium">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Transfer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
