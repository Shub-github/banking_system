import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const { state } = useLocation();
  const { user } = state; // Extract user data from state

  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    currency: "USD",
  });

  const [balance, setBalance] = useState(user.initialBalance);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customers = JSON.parse(sessionStorage.getItem("users")) || [];
    console.log("====customers====>", customers);
    let customer2 = customers.find(
      (c) => c.accountNumber === formData.recipientAccountNumber
    );
    console.log("====user====>", user);
    console.log("====customer2====>", customer2);

    setBalance(Number(user.initialBalance));

    const { recipientAccountNumber, amount } = formData;
    const amountNumber = Number(amount);

    if (balance < amountNumber) {
      alert("Insufficient funds");
      return;
    }

    console.log("====amountNumber====>", amountNumber);
    console.log("====balance====>", balance);

    user.initialBalance = balance - amountNumber;
    customer2.initialBalance = customer2.initialBalance + amountNumber;
    setBalance(user.initialBalance);
    customers = customers.map(
      (c) => (
        console.log("=====customerupdate=====>", c),
        c.accountNumber === user.accountNumber
          ? user
          : c.accountNumber === customer2.accountNumber
          ? customer2
          : c
      )
    );
    sessionStorage.setItem("users", JSON.stringify(customers));

    alert("Funds transferred successfully");
  };

  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0">
      <div className="w-7/12 max-w-[450px] ">
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
      </div>

      <div className="relative w-5/12 max-w-[450px]">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
