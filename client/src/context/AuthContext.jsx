"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {postAndPatchReq , getAndDeleteReq , baseUrl} from "@/apicalls/apicalls";

const AuthContext = createContext({
    user:null,
    registerUser:()=>{},
    loginUser:()=>{},
    logoutUser:()=>{},
    currentUser:()=>{},
})
const useAuth = ()=>useContext(AuthContext);
const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);
    const [error , setError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const currentUser = async()=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/user/me` , "get");
            console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "unable to find current user. Please refresh page!.";
            return { success: false, error: errorMessage || "unable to find current user.." };
        }finally{
            setIsLoading(false);
        }
    }

    const registerUser = async(data)=>{
        setIsLoading(true);
        console.log("the registerData is! " , data);
        try {
            const response = await postAndPatchReq(`${baseUrl}/user/register` , "post" , data);
            console.log("the response AuhtContext! " , response);
            const results = await currentUser();
            return results;
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "Registration failed." }; 
        }finally{
            setIsLoading(false);
        }
    }
    const loginUser = async(data)=>{
        setIsLoading(true);
        try {
            console.log("base url is! " , baseUrl);
            const response = await postAndPatchReq(`${baseUrl}/user/login` , "post" , data);
            // console.log("response from AuthContext! " , response?.data);
            const results = await currentUser();
            return results;
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "login failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "login failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const logoutUser = async()=>{
        setIsLoading(true);
        try {
            const response = await getAndDeleteReq(`${baseUrl}/user/logout` , "get");
            // console.log("response from AuthContext! " , response?.data);
            setUser(null);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from AuthContext! " , error);
            const errorMessage = error.response?.data?.message || "logout failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage || "logout failed." };
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <AuthContext.Provider value={{user , registerUser , loginUser , logoutUser , error , isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider , useAuth}