"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { resetState } from '@/fetch/resetstate';
import { passwordReseted } from '@/fetch/passwordreseted';
import { Style } from './styleJS';
import { motion } from 'framer-motion';


function Repassword() {
    const router = useRouter()
    const [tokenError, setTokenError] = useState("");
    const [storeData, setStoreData] = useState(null);
    const [token,setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localStorageData = localStorage.getItem("myData");
    if (localStorageData) {
      setStoreData(JSON.parse(localStorageData));
    }
  }, [])
  
  useEffect(() => {
    const checkResetState = async () => {
      try {
          const {success,error,token} = await resetState({ email: storeData.email });
          if (!success) {
            setTokenError(error)
            localStorage.removeItem('myData');
            router.push('/login/signup');
          }else{
            setToken(token)
          }
       
      } catch (error) {
        throw error
      }
    };

    if (storeData) {
      checkResetState();
    }
  }, [storeData]);

  const handleResetPassword = async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target);
    const {password,repassword} = Object.fromEntries(formData);
    const {success,error} = await passwordReseted({password,repassword,token})
    if(success){
      router.push('/login')
      setIsLoading(false)
    }else{
      setTokenError(error)
      setIsLoading(false)
      const clearForm = document.querySelector("#resetForm");
      clearForm.reset()
    }
  }


  return (
    <form id='resetForm' name='resetForm' onSubmit={handleResetPassword} style={Style.formContainer}>
      <h1 style={Style.changePassword}>Change Password</h1>
      <p style={Style.error}>{tokenError}</p>
      <label htmlFor="password">
        <p>Password</p>
        <input type="password" name='password' id='password' placeholder='Enter your new password'  style={Style.input}/>
      </label>
      <label htmlFor="repassword">
        <p>Retype Password</p>
        <input type="password" name='repassword' id='repassword' placeholder='Retype new password'  style={Style.input}/>
      </label>
      <motion.button style={!isLoading?Style.button:Style.buttonLoading}
      whileHover={{
        scale:1.03
      }}
      >{!isLoading?"Submit":"Wait"}</motion.button>
    </form>
  )
}

export default Repassword