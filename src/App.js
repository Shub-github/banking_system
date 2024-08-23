import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
// import { Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const savedUser = JSON.parse(sessionStorage.getItem("user"));
  let userRole = ""; // Declare userRole here so it's in the component's scope

  if (savedUser) {
    userRole = savedUser.role;
  } else {
    userRole = "";
  }
  console.log("=====appjs===>", savedUser);
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            userRole === "admin" ? <AdminDashboard /> : <UserDashboard />
          }
        />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
