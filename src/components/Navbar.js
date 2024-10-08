import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between z-10 items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} alt="Logo" width={80} height={32} loading="lazy"></img>
      </Link>
      <nav>
        <ul className="text-richblack-100 flex gap-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contacts</Link>
          </li>
        </ul>
      </nav>
      {/* login,logout,signup,dashboard */}
      <div className="flex items-center ml-5 mr-2 gap-2">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
            >
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
            >
              Signup
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button
              className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
            >
              Dashboard
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged out!!");

                handleLogout();
              }}
            >
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
