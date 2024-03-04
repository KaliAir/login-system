"use client"
import React from 'react'
import { VscUnverified } from "react-icons/vsc";
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import { confirm } from '@/fetch/confirm';
import { useRouter } from 'next/navigation';
import { useState,useEffect} from 'react';
import { generateToken } from '@/fetch/generatetoken';
import { verifyemail } from '@/fetch/verifyemail';
import { send } from '@/fetch/send';
import Link from 'next/link';

function Verify() {
  const router = useRouter()
  const [errorMessage,setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relog,setRelog] = useState(false);
  const [storeData, setStoreData] = useState(null)

  useEffect(()=>{
    const localStorageData = localStorage.getItem('myData')
    if(localStorageData){
      setStoreData(JSON.parse(localStorageData));
    }else{
      router.push('/login/signup')
    }
  },[])

  const handleVerify = async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {email} = await verifyemail(storeData.email)
    if(!email){
      localStorage.removeItem('myData')
      router.push('/login/signup')
    }
    const {success,error} = await confirm(dataObj);
    if(success){
      setIsLoading(false)
      localStorage.removeItem('myData')
      router.push("/login");
    }else{
      setIsLoading(false)
      setErrorMessage(error);
    }
  }
    
  const resendEmail = async ()=>{
      const myForm = document.querySelector("#myForm")
      const localData = localStorage.getItem('myData');
      const storeData = JSON.parse(localData);
      // const decodedEmail = decodeURIComponent(params.verify)
      const {success,isEmailFormat,error}= await generateToken({email:storeData.email})
      setErrorMessage(error)
      if(error === "Can't generate please relog"){
        setRelog(true);
      }
      if(success && isEmailFormat){
        myForm.reset();
        const {email, token} = await verifyemail({email:decodedEmail});
        const sendEmail = await send({email,token});
    }
  }
  return (
    <form id='myForm' onSubmit={handleVerify} style={Style.verifyContainer}>
        <p style={Style.errorMessage}>{errorMessage}</p>
        {!relog?(<VscUnverified style={Style.verifyIcon}/>):<Link href='/login'><motion.p whileHover={{scale:1.03}} style={Style.relog}>{`->RELOG<-`}</motion.p></Link>}
        <p style={Style.emailCheck}>Please check your email.</p>
        <input type="text" name="token" id="token" placeholder='Verification code here'  style={Style.input}/>
        <motion.p style={Style.resend}
        whileHover={{
            scale: 1.05,
            color: "#1D24CA"
        }}
        onClick={resendEmail}
        >resend</motion.p>
        <motion.button style={!isLoading?Style.button:Style.buttonLoading}
        whileHover={{
            scale: 1.05
        }}
        >{!isLoading?"Verify":"Wait"}</motion.button>
    </form>
  )
}

export default Verify