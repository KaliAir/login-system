"use client";
import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { MdLockOutline } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImGoogle3 } from "react-icons/im";
import { Style } from "./styleJS";
import { robotoFont } from "@/fonts/font";
import { oswaldFont } from "@/fonts/font";
import { motion } from "framer-motion";
import { IoIosHome } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateToken } from "@/fetch/generatetoken";
import { verifyemail } from "@/fetch/verifyemail";
import { send } from "@/fetch/send";
import { isverified } from "@/fetch/isverified";


function LoginPage() {
  const router = useRouter()
  const {data:session,status} = useSession();
  const [loginError,setLoginError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

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
    const {verified} = await isverified({email:dataObj.email})
    if(verified === false){
      const {message} = await generateToken({email:dataObj.email})
      if(message === "TokenGenerated"){
        setIsLoading(false)
        const {email, token} = await verifyemail({email:dataObj.email})
        const sendEmail = await send({email,token})
        router.push(`/login/signup/${dataObj}`)
      }
    }
    const {ok}= await signIn("credentials",{
      ...dataObj,
      redirect: false
    });
    if(!ok){
      setIsLoading(false)
      setLoginError("Email or Password does'nt match")
    }

    if(ok){
      setIsLoading(false)
      router.push("/admin")
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
      <h1 style={Style.login} className={robotoFont.className}>
        Login
      </h1>
      <p style={Style.error}>{loginError}</p>
      <div>
        <p className={oswaldFont.className}>Email</p>
        <label htmlFor="email" style={Style.label}>
          <TfiEmail style={Style.emailIcon} />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
            style={Style.input}
            required
          />
        </label>
      </div>
      <div>
        <p className={oswaldFont.className}>Password</p>
        <label htmlFor="password" style={Style.label}>
          <MdLockOutline style={Style.passwordIcon} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
            style={Style.input}
            required
          />
        </label>
      </div>
      <div style={Style.signFor}>
        <motion.div
          whileHover={{
            color:"#78A083"
          }}
          style={Style.signUpForget}
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
      <motion.button
        style={!isLoading?Style.button:Style.buttonLoad}
        whileHover={{
          scale: 1.03,
        }}
        className={robotoFont.className}
      >
        {!isLoading?"LOGIN":"WAIT"}
      </motion.button>
      <p style={Style.or}>Or Sign Up Using</p>
      <div style={Style.signInWith}>
        <ImGoogle3 style={Style.googleIcon} onClick={handdleSignInWithGoogle} />
        <FaFacebook style={Style.fbIcon} onClick={handdleSignInWithFacebook}/>
        <AiFillTwitterCircle style={Style.twitterIcon} onClick={handleSignInWithTwitter}/>
      </div>
    </form>
  );
}

export default LoginPage;
