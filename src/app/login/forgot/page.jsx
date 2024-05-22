"use client"
import React from 'react'
import { FaLock } from "react-icons/fa";
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { generateToken } from '@/fetch/generatetoken';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { changePass } from '@/fetch/changePass';
import { forgotEmailCheck } from '@/fetch/forgotemailcheck';

function ForgotPass() {
  const router = useRouter();
  const [forgotLoading,setForgotLoading] = useState(false);
  const [verifiedError,setVerifiedError] = useState("");

  const handleForgotPassowrd = async (e)=>{
    e.preventDefault();
    setForgotLoading(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {verified,error} = await forgotEmailCheck(dataObj); //check the email if it exists then return the state of the verified in db(true OR false)
    if(verified){
      const {success, verificationToken:{email, token}} = await generateToken(dataObj);
      if(success){
        const {data} = await changePass({email,token});
        setForgotLoading(false)
        if(data?.id !== undefined){
          router.push(`/login/forgot/${dataObj.email}`);
        }
      }
    }else{
      if(error){
        setVerifiedError(error)
      }
      setVerifiedError("Not verified, login to verify")
      setForgotLoading(false);
      
    }
  }
  return (
    <form onSubmit={handleForgotPassowrd} style={Style.forgotContainer}>
      <FaLock style={Style.lockIcon}/>
      <p style={Style.error}>{verifiedError}</p>
      <label htmlFor="email">
      <p style={Style.emailLabel}>Email</p>
      <input type="email" name='email' id='email' placeholder='Type your email here' style={Style.input}/>
      </label>
      <motion.button style={!forgotLoading?Style.button:Style.buttonLoading}
      whileHover={{
        scale: 1.03
      }}
      >{!forgotLoading?"Send":"Wait"}</motion.button>
      <div>
        <Link href='/login'>
          <p style={Style.login}>Login</p>
        </Link>
      </div>
    </form>
  )
}

export default ForgotPass