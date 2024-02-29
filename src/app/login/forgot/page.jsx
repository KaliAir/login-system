"use client"
import React from 'react'
import { FaLock } from "react-icons/fa";
import { Style } from './styleJS';
import { Kdam_Thmor_ProFont } from '@/fonts/font';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { isverified } from '@/fetch/isverified';
import { generateToken } from '@/fetch/generatetoken';

function ForgotPass() {

  const handleForgotPassowrd = async (e)=>{
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {verified} = await isverified(dataObj);
    if(verified){
      const {success} = await generateToken(dataObj);
      
    }
  }
  return (
    <form onSubmit={handleForgotPassowrd} style={Style.forgotContainer} className={Kdam_Thmor_ProFont.className}>
      <FaLock style={Style.lockIcon}/>
      <input type="email" name='email' id='email' placeholder='Type your email here' style={Style.input}/>
      <motion.button style={Style.button}
      whileHover={{
        scale: 1.03
      }}
      >Send</motion.button>
      <div>
        <Link href='/login'>
          <p style={Style.login}>Login</p>
        </Link>
      </div>
    </form>
  )
}

export default ForgotPass