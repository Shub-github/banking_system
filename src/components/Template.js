import React from "react";
import frameImage from "../assets/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";

function Template({ title, desc1, desc2, image, formType, setIsLoggedIn }) {
  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 rounded-md">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        {/* idr description */}
        <p className="text-[1.125rem] leading[1.625rem] mt-4">
          <spam className="text-richblack-100">{desc1}</spam>

          <spam className="text-blue-100 italic">{desc2}</spam>
        </p>
        {/* Idr form ayega signup se ya loginform */}

        {formType === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* idr hum line layegai */}
        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-richblack-700"></div>
          <div className="text-richblack-700 font-medium leading[1.375rem]">
            Or
          </div>
          <div className="w-full h-[1px] bg-richblack-700"></div>
        </div>

        <button
          className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 "
        >
          <FcGoogle />
          <p>Signup with google!!</p>
        </button>
      </div>
      {/* Image ke liye */}
      <div className="relative w-11/12 max-w-[450px] rounded-md">
        <img
          src={frameImage}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
        />

        <img
          src={image}
          alt="Students"
          width={558}
          height={490}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
}

export default Template;
