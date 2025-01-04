import { useState } from "react";

const RegisrationPage = () => {
  const [toggle, setToggle] = useState(false);
  const [SignInData, setSignInData] = useState({
    email:"",
    password:""
  })
  const [SignUpData, setSignUpData] = useState({
    name:"",
    email:"",
    pasword:""
  })
  const handleRegisterBtn = (e) => {
    setToggle(e.target.id === "btn1" ? true : false);
  };
  return (
    <div className="w-[400px] h-[380px] bg-white pb-10">
      <div className="flex">
        <button
          id="btn1"
          onClick={handleRegisterBtn}
          className={`py-2 flex-1 bg-gray-300`}
        >
          SignIn
        </button>
        <button
          id="btn2"
          onClick={handleRegisterBtn}
          className={`py-2 flex-1 bg-gray-300`}
        >
          SignUp
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        {!toggle ? (
          <div className={`w-full h-full flex flex-col justify-center items-center`}>
            <h1 className=" font-bold text-center my-3">SignUp</h1>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex flex-col">
                <label htmlFor="" className="">
                  Name:
                </label>
                <input
                  type="text"
                  value={SignUpData.name}
                  onChange={(e)=>setSignUpData({...SignUpData,name:e.target.value})}
                  className="p-2 border-[1px] rounded-md border-gray-500 w-full"
                  placeholder="Enter your name..."
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  value={SignUpData.email}
                  onChange={(e)=>setSignUpData({...SignUpData,email:e.target.value})}
                  className="p-2 border-[1px] rounded-md border-gray-500 w-full"
                  placeholder="Enter you email..."
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password:</label>
                <input
                  type="password"
                  value={SignUpData.password}
                  onChange={(e)=>{setSignUpData({...SignUpData,password:e.target.value})}}
                  className="p-2 border-[1px] rounded-md border-gray-500 w-full"
                  placeholder="********"
                />
              </div>
              <input
                className=" p-2 rounded-xl px-4 mt-3 bg-slate-900 text-white"
                type="submit"
                onClick={() => console.log(SignUpData)}
                value={"SignIn"}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className=" font-bold text-center my-3">SignIn</h1>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex flex-col">
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  className="p-2 border-[1px] rounded-md border-gray-500 w-full"
                  value={SignInData.email}
                  onChange={(e)=>setSignInData({...SignInData,email:e.target.value})}
                  placeholder="Enter you email..."
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password:</label>
                <input
                  type="text"
                  className="p-2 border-[1px] rounded-md border-gray-500 w-full"
                  value={SignInData.password}
                  onChange={(e)=>setSignInData({...SignInData,password:e.target.value})}
                  placeholder="********"
                />
              </div>
              <input
                className=" p-2 rounded-xl px-4 mt-3 bg-slate-900 text-white"
                type="submit"
                onClick={()=>console.log(SignInData)}
                value={"SignUp"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisrationPage;
