import React, { useState } from "react";
// import { transferFunds } from '../../services/accountService';

const TransferFunds = () => {
  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    currency: "USD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("===form=====>", formData);
    try {
      //   await transferFunds(formData);
      alert("Funds transferred successfully");
      // Update session balance logic here
    } catch (error) {
      console.error("Error transferring funds", error);
    }
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    //   >
    //     <h2 className="text-2xl font-semibold mb-6 text-center">
    //       Transfer Funds
    //     </h2>

    //     <div className="mb-4">
    //       <label
    //         htmlFor="recipientAccountNumber"
    //         className="block text-gray-700 font-medium mb-2"
    //       >
    //         Recipient Account Number
    //       </label>
    //       <input
    //         type="text"
    //         name="recipientAccountNumber"
    //         placeholder="Recipient Account Number"
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
    //       />
    //     </div>

    //     <div className="mb-4">
    //       <label
    //         htmlFor="amount"
    //         className="block text-gray-700 font-medium mb-2"
    //       >
    //         Amount
    //       </label>
    //       <input
    //         type="number"
    //         name="amount"
    //         placeholder="Amount"
    //         onChange={handleChange}
    //         required
    //         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
    //       />
    //     </div>

    //     <div className="mb-6">
    //       <label
    //         htmlFor="currency"
    //         className="block text-gray-700 font-medium mb-2"
    //       >
    //         Currency
    //       </label>
    //       <select
    //         name="currency"
    //         onChange={handleChange}
    //         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
    //       >
    //         <option value="USD">USD</option>
    //         <option value="GBP">GBP</option>
    //         <option value="EUR">EUR</option>
    //       </select>
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
    //     >
    //       Transfer Funds
    //     </button>
    //   </form>
    // </div>
    <h1>hii</h1>
  );
};

export default TransferFunds;
