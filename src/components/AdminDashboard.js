import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
      setFormStatus(existingUsers);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isSubmitted]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    accountNumber: "",
    initialBalance: 10000,
    isActive: true,
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function generateAccountNumber() {
    // Generating a unique 10-digit account number
    return Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0");
  }

  function submitHandler(event) {
    event.preventDefault();

    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    const isFirstUser = existingUsers.length === 0;

    const newUser = {
      username: formData.firstName + " " + formData.lastName,
      email: formData.email,
      dob: formData.dob,
      address: formData.address,
      accountNumber: generateAccountNumber(),
      initialBalance: formData.initialBalance,
      isActive: formData.isActive,
      role: isFirstUser ? "admin" : "user",
    };

    existingUsers.push(newUser);
    sessionStorage.setItem("users", JSON.stringify(existingUsers));

    setIsSubmitted(true);
    toast.success("Registration successful !!");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      address: "",
      accountNumber: "",
      initialBalance: 10000,
      isActive: true,
    });
  }

  function handleRowClick(user) {
    navigate("/user-details", { state: { user } });
  }

  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0">
      <div className="w-11/12 h-auto max-w-[450px] ">
        <div className="relative max-h-[500px] overflow-x-auto overflow-y-auto rounded-md">
          {" "}
          {/* Set a max-height and allow both x and y axis scrolling */}
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
              {formStatus.map((user, index) => (
                <tr
                  onClick={() => handleRowClick(user)}
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.accountNumber}</td>
                  <td className="px-6 py-4">${user.initialBalance}</td>
                  <td className="px-6 py-4">{user.isActive ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative w-11/12 max-w-[450px]">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="flex gap-x-4 mt-[20px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                First Name<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                placeholder="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>

            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Last Name<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <div className="mt-[20px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Email<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                placeholder="Enter the Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <div className="mt-[20px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Date of Birth<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="date"
                name="dob"
                value={formData.dob}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <div className="mt-[20px]">
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Address<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                placeholder="Enter Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={changeHandler}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
              />
            </label>
          </div>

          <button className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
