import React from "react";
import signupImg from "../assets/signup.jpg";
import Template from "../components/Template";

const Signup = ({ setIsLoggedIn }) => {
  return (
    <Template
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default Signup;
