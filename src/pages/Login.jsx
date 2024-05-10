import React, { useState } from "react";
import TextInput from '../components/TextInput'
import Hr from '../components/Hr'
const Login = () => {
  return (
    <div className="flex  h-screen justify-center items-center ">
      <div className="bg-white p-10 rounded-lg drop-shadow-md w-[500px]">
        <h1 className="text-2xl text-primary text-center font-bold">Login</h1>
        <Hr gap={10} />
        <TextInput label={"Mobile Number"} type={"text"} />
        <Hr gap={10} />
        <TextInput label={"Password"} type={"password"} />
        <Hr gap={10} />
        <div className=" flex justify-center  ">
          <button className="px-10 bg-primary py-2 rounded-md text-white">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login