import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SignupForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountNumber: "",
    initialBalance: 10000,
    isActive: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [accountType, setAccountType] = useState("student");

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

  useEffect(() => {
    // Load user data from session storage on component mount
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setFormData(JSON.parse(savedUser));
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match !!");
      return;
    }

    const accountData = {
      ...formData,
    };

    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];

    const isFirstUser = existingUsers.length === 0;

    const newUser = {
      username: formData.firstName + " " + formData.lastName, // Add a space between firstName and lastName
      password: formData.password,
      email: formData.email,
      accountNumber: generateAccountNumber(),
      initialBalance: formData.initialBalance,
      isActive: formData.isActive,
      role: isFirstUser ? "admin" : "user",
    };

    // Add the new user to the users array
    existingUsers.push(newUser);

    // Save the updated users array in session storage
    sessionStorage.setItem("users", JSON.stringify(existingUsers));

    // Save the current user data in session storage
    sessionStorage.setItem("user", JSON.stringify(newUser));

    // Update the user state in the application
    setFormData(newUser);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountNumber: "",
      initialBalance: 10000,
      isActive: true,
    });
    toast.success("Registration successful !!");

    // console.log("printing Data with navigate to Dashboard !!");
    console.log(newUser);

    // navigate("/dashboard");
    navigate("/login");
  }

  return (
    <div>
      {/* First name & Last name */}
      <form onSubmit={submitHandler} autoComplete="off">
        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              placeholder="First Name !!"
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

        {/* Email */}
        <div className="mt-[20px]">
          <label className="w-full mt-[20px]">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              placeholder="Enter the Email !!"
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
          </label>
        </div>

        {/* password */}
        <div className="w-full flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              placeholder="Create Password !!"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              placeholder="Confirm Password !!"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </label>
        </div>
        <button className=" w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
