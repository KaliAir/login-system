"use client"
import React from 'react'
import { VscUnverified } from "react-icons/vsc";
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import { resetpassword } from '@/fetch/resetpassword';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function PasswordReset({params}) {
  const router = useRouter();
  const [resetLoading,setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  
  const handleResetPassword = async (e)=>{
    e.preventDefault()
    setResetLoading(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {success,error} = await resetpassword(dataObj);
    if(success){
      setResetLoading(false);
      router.push('/login/repass');
    }else{
      setResetLoading(false);
      setResetError(error);
    }
  }

  return (
    <form id='myForm' onSubmit={handleResetPassword} style={Style.verifyContainer}>
        <p style={Style.errorMessage}>{resetError}</p>
        <VscUnverified style={Style.verifyIcon}/>
        <p style={Style.emailCheck}>Input reset password token. </p>
        <input type="text" name="token" id="token" placeholder='Reset Token Here'  style={Style.input}/>
        <motion.p style={Style.resend}
        whileHover={{
            scale: 1.05,
            color: "#1D24CA"
        }}      
        >resend</motion.p>
        <motion.button style={!resetLoading?Style.button:Style.buttonLoading}
        whileHover={{
            scale: 1.02
        }}
        >{!resetLoading?"Send":"Wait"}</motion.button>
    </form>
  )
}

export default PasswordReset