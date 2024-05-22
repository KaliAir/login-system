"use client";
import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { MdLockOutline } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImGoogle3 } from "react-icons/im";
import { Style } from "./styleJS";
import { motion } from "framer-motion";
import { IoIosHome } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateToken } from "@/fetch/generatetoken";
import { send } from "@/fetch/send";
import { isverified } from "@/fetch/isverified";
import { LuEye,LuEyeOff } from "react-icons/lu";


function LoginPage() {
  const router = useRouter()
  const {data:session,status} = useSession();
  const [loginError,setLoginError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [eyeState, setEyeState] = useState(false);

  useEffect(()=>{
    if(status === 'authenticated'){
      router.push("/admin")
    }
  },[status])

  const handleLogin = async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const {verified,password,error} = await isverified({email:dataObj.email,password:dataObj.password})
    if(!verified && password){
      const {success, verificationToken:{email, token}} = await generateToken({email:dataObj.email})
      if(success){
        const {data} = await send({email,token})
        setIsLoading(false)
        if(data?.id !== undefined){
          router.push(`/login/signup/${email}`)
        }
      }
    }
    const credentials = await signIn("credentials",{
      ...dataObj,
      redirect: false
    });
    if(!credentials.ok){
      setIsLoading(false)
      setLoginError(credentials.error.trim() !== "CredentialsSignin"? "Invalid credentials use google":error)
    }else{
      router.push('/admin')
    }

    }
    

  const handdleSignInWithGoogle = async ()=>{
    await signIn('google')
  }
  const handdleSignInWithFacebook = async ()=>{
    await signIn('facebook')
  }
  const handleSignInWithTwitter = async ()=>{
    await signIn('twitter')
  }

  return (
    <form onSubmit={handleLogin} style={Style.form}>
      <motion.div style={Style.goBack}
        whileHover={{
          scale: 1.04
        }}
      >
        <Link href='/'>
          <IoIosHome/>
        </Link>
      </motion.div>
      <h1 style={Style.login}>
        Login
      </h1>
      {loginError?<p style={Style.error}>{loginError}</p>:""}
      <div>
        <p>Email</p>
        <label htmlFor="email" style={Style.label}>
          <TfiEmail style={Style.emailIcon} />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
            style={Style.input}
          />
        </label>
      </div>
      <div>
        <p>Password</p>
        <label htmlFor="password" style={Style.labelPassword}>
          <MdLockOutline style={Style.passwordIcon} />
          <input
            type={eyeState?"text":"password"}
            name="password"
            id="password"
            placeholder="Type your password"
            style={Style.input}
          />
          {!eyeState?(<LuEyeOff style={Style.labelEye} onClick={()=>setEyeState(true)}/>):(<LuEye style={Style.labelEye} onClick={()=>setEyeState(false)}/>)}
        </label>
      </div>
      
      <motion.button
        style={!isLoading?Style.button:Style.buttonLoad}
        whileHover={{
          scale: 1.03,
        }}
      
      >
        {!isLoading?"LOGIN":"WAIT"}
      </motion.button>
      <p style={Style.or}>Or Sign In Using</p>
      <div style={Style.signInWith}>
        <motion.div
        whileHover={{
          scale:1.05
        }}
        >
          <ImGoogle3 style={Style.googleIcon} onClick={handdleSignInWithGoogle} />
        </motion.div>
        <motion.div
        whileHover={{
          scale:1.05
        }}
        >
          <FaFacebook style={Style.fbIcon} onClick={handdleSignInWithFacebook}/>
        </motion.div>
        <motion.div
        whileHover={{
          scale:1.05
        }}
        >
          <AiFillTwitterCircle style={Style.twitterIcon} onClick={handleSignInWithTwitter}/>
        </motion.div>
      </div>
      <div style={Style.signFor}>
        <motion.div
          whileHover={{
            color:"#78A083"
          }}
          style={Style.signUpSign}
        >
          <Link href='/login/signup'>Sign Up</Link>
        </motion.div>

        <motion.div
          whileHover={{
            color:"#D04848"
          }}
          style={Style.signUpForget}
        >
          <Link href='/login/forgot'>Forgot password</Link>
        </motion.div>
      </div>
    </form>
  );
}

export default LoginPage;
