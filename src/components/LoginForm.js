import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   // Load user data from session storage on component mount
  //   const savedUser = sessionStorage.getItem("users");
  //   console.log("===svd====>", savedUser);
  //   if (savedUser) {
  //     setFormData(JSON.parse(savedUser));
  //   }
  // }, []);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    // const savedUser = JSON.parse(sessionStorage.getItem("user"));
    // Retrieve the existing users array from session storage
    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    // console.log("===existingUsers====>", existingUsers);
    // Find the user with the matching username and password
    const savedUser = existingUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    // console.log("====svd2====>", savedUser);

    if (savedUser) {
      // Set the logged-in user in session storage
      sessionStorage.setItem("user", JSON.stringify(savedUser));

      // Update the formData and isLoggedIn state
      setFormData(savedUser);
      setIsLoggedIn(true);
      setFormData({
        email: "",
        password: "",
      });

      // Display success message and navigate to the appropriate dashboard
      toast.success("Logged In !!");
      navigate("/dashboard");
      // navigate(
      //   savedUser.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
      // ); // Redirect based on user role
    } else {
      toast.error("Invalid username or password");
    }

    // if (
    //   savedUser &&
    //   savedUser.email === formData.email && // Use formData.username instead of username
    //   savedUser.password === formData.password // Use formData.password instead of password
    // ) {
    //   setFormData(savedUser); // Update formData with the saved user details
    //   setIsLoggedIn(true); // Set the user as logged in
    //   toast.success("Logged In !!"); // Display a toast notification
    //   navigate(
    //     savedUser.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
    //   ); // Redirect based on user role
    // } else {
    //   alert("Invalid username or password");
    // }
  }

  return (
    <form
      className="flex flex-col w-full gap-y-4 mt-6"
      onSubmit={submitHandler}
      autoComplete="off"
    >
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address<sup>*</sup>
        </p>
        <input
          required
          placeholder="Enter you Email !!"
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          password<sup className="text-pink-200">*</sup>
        </p>

        <input
          required
          placeholder="Enter the Password !!"
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
        <Link to="#">
          <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
            Forgot Password !!
          </p>
        </Link>
      </label>
      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
