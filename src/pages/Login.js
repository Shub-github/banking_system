import React from "react";
import Template from "../components/Template";
import loginImg from "../assets/login.webp";

const Login = ({ setIsLoggedIn }) => {
  return (
    <Template image={loginImg} formType="login" setIsLoggedIn={setIsLoggedIn} />
  );
};

export default Login;
