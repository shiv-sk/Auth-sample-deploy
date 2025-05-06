"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login(){
    const router = useRouter();
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })

    const {loginUser , isLoading} = useAuth();
    const handleOnChange = (e)=>{
        setLoginData({...loginData , [e.target.name]:e.target.value})
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            const response = await loginUser(loginData);
            // console.log("response from loginPage! " , response);
            if(response.success){
                router.push("/");
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "server Error! "
            toast.error(errorMessage)
        }
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-lg">
                <h1 className="text-center font-bold text-2xl mb-1.5">Login</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>    
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="exp@email.com" 
                    className="input w-full"
                    value={loginData.email}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
                    <input
                    name="password" 
                    type="password"
                    id="password" 
                    placeholder="pass@123" 
                    className="input w-full"
                    value={loginData.password}
                    autoComplete="true"
                    onChange={handleOnChange} 
                    required/>
                    <p> Create a new account <Link href={"/register"}>
                    <span className="hover:border-b-2 hover:cursor-pointer hover:text-blue-500">Register</span></Link></p>
                    <button 
                    type="submit" 
                    className="btn w-full btn-neutral text-lg font-semibold" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Login"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}