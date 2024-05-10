import { useState } from "react";
import TextInput from '../components/TextInput'
import Hr from '../components/Hr'

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {setToken} from '../features/authSlice'
import { userToken } from "../services/auth";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const loginMutation=useMutation({
    mutationFn:userToken,
    onSuccess:async(res)=>{
      const token  = res.data.token
      
      localStorage.setItem("tokenFreelancing", token)
      dispatch(setToken(token));
    },
    onError:()=>{
      console.log('login failed')
    }
  })

   const loginHandler = () => {
    const formData = {
      mobileNumber:mobile,
      password:password,
    };
    loginMutation.mutate(formData)
  };

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