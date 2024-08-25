import React from "react";
import home from "../assets/home.png";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen text-white text-3xl">
      <img
        src={home}
        alt="home page"
        className="fixed top-0 left-0 w-full h-full object-cover shadow-lg rounded-md"
      />
    </div>
  );
};

export default Home;
