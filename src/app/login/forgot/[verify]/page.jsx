"use client"
import React from 'react'
import { VscUnverified } from "react-icons/vsc";
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import { resetpassword } from '@/fetch/resetpassword';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function PasswordReset() {
  const router = useRouter();
  const [resetLoading,setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleResetPassword = async (e)=>{
    e.preventDefault()
    setResetLoading(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {success,error,email} = await resetpassword(dataObj);
    if(success){
      setResetLoading(false);
      const data = {email}
      localStorage.setItem('myData',JSON.stringify(data))
      router.push('/login/repass');
    }else{
      setResetLoading(false);
      setResetError(error);
    }
  }

  return (
    <form id='myForm' name='myForm' onSubmit={handleResetPassword} style={Style.verifyContainer}>
        <p style={Style.errorMessage}>{resetError}</p>
        <VscUnverified style={Style.verifyIcon}/>
        <p style={Style.emailCheck}>Input reset password token. </p>
        <input type="text" name="token" id="token" placeholder='Reset Token Here'  style={Style.input}/>
        <motion.button style={!resetLoading?Style.button:Style.buttonLoading}
        whileHover={{
            scale: 1.02
        }}
        >{!resetLoading?"Send":"Wait"}</motion.button>
    </form>
  )
}

export default PasswordReset