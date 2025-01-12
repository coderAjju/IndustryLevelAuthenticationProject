import React, { useState } from "react";

const LoginRegister = () => {
  const [toggle, setToggle] = useState(true); // true for login, false for register

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="w-96 bg-white rounded-sm py-4">
        <div className=" my-5 w-[220px] mx-auto relative h-[44px] boxShadow rounded-full">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#ff105f] to-[#ffad06] rounded-full transition-all duration-400"></div>
          <div className="absolute left-0 top-0 bg-transparent w-full">
            <button className="w-1/2 bg-transparent px-8 py-2">Login</button>
            <button className="w-1/2 bg-transparent px-8 py-2">Register</button>
          </div>
        </div>

        {/* social icons */}
        <div className="flex justify-center items-center gap-4 my-7">
          <img
            className="w-8 h-8 rounded-full"
            src="https://i.postimg.cc/kGrgFySk/fb.png"
            alt="logo"
          />
          <img
            className="w-8 h-8 rounded-full"
            src="https://i.postimg.cc/PfZxfBsh/tw.png"
            alt="logo"
          />
          <img
            className="w-8 h-8 rounded-full"
            src="https://i.postimg.cc/4yzN8hbn/gp.png"
            alt="logo"
          />
        </div>
        <div className=" w-80 mx-auto whitespace-nowrap">
          <form className="w-full inline-block">
            <div className="flex flex-col gap-4">
            <input type="text" placeholder="Username" className="py-2 px-1 text-md border-b-2 w-full outline-none" required />
            <input type="password" placeholder="Enter Password" className="py-2 px-1 text-md border-b-2 w-full outline-none" required />
            </div>
            <div className="flex gap-2 mt-5">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className=" text-xs text-gray-700"> Remember Password</label>
            </div>
            <div className="flex justify-center items-center">
            <button type="submit" className="bg-gradient-to-r from-[#ff105f] to-[#ffad06] py-2 rounded-full w-[80%]  mt-4">Login</button>
            </div>
          </form>
          <form className="w-full inline-block">
            <div className="flex flex-col gap-4">
            <input type="text" placeholder="Username" className="py-2 px-1 text-md border-b-2 w-full outline-none" required />
            <input type="password" placeholder="Enter Password" className="py-2 px-1 text-md border-b-2 w-full outline-none" required />
            </div>
            <div className="flex gap-2 mt-5">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className=" text-xs text-gray-700"> Remember Password</label>
            </div>
            <div className="flex justify-center items-center">
            <button type="submit" className="bg-gradient-to-r from-[#ff105f] to-[#ffad06] py-2 rounded-full w-[80%]  mt-4">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
