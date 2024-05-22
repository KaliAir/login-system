"use client";
import React from "react";
import { VscUnverified } from "react-icons/vsc";
import { Style } from "./styleJS";
import { motion } from "framer-motion";
import { confirm } from "@/fetch/confirm";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { generateToken } from "@/fetch/generatetoken";
import { verifyemail } from "@/fetch/verifyemail";
import { send } from "@/fetch/send";
import Link from "next/link";

function Verify() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relog, setRelog] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  

  useEffect(() => {
    const localStorageData = localStorage.getItem("myData");
    if (localStorageData) {
      setStoreData(JSON.parse(localStorageData));
    } else {
      router.push("/login/signup");
    }
  }, []);

  useEffect(() => {
    if (expirationTime) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = Math.max(0, Math.floor((expirationTime - now) / 1000));
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expirationTime]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const { email } = await verifyemail(storeData);
    if (!email) {
      localStorage.removeItem("myData");
      router.push("/login/signup");
    }
    const { success, error } = await confirm(dataObj);
    if (success) {
      setIsLoading(false);
      localStorage.removeItem("myData");
      router.push("/login");
    } else {
      setIsLoading(false);
      setErrorMessage(error);
    }
  };

  const resendEmail = async () => {
    const myForm = document.querySelector("#myForm");
  
    // const decodedEmail = decodeURIComponent(params.verify)
    const {
      success,
      isEmailFormat,
      error,
      verificationToken: { expires, email, token },
    } = await generateToken(storeData);
    setErrorMessage(error);
    if (error === "Can't generate please relog") {
      setRelog(true);
    }
    if (success && isEmailFormat) {
      myForm.reset();
      const data = await send({ email, token });
      setExpirationTime(new Date(expires).getTime());
    }
  };
  return (
    <form
      id="myForm"
      name="myForm"
      onSubmit={handleVerify}
      style={Style.verifyContainer}
    >
      
      <p style={Style.errorMessage}>{errorMessage}</p>
      {!relog ? (
        <VscUnverified style={Style.verifyIcon} />
      ) : (
        <Link href="/login">
          <motion.p
            whileHover={{ scale: 1.03 }}
            style={Style.relog}
          >{`->RELOG<-`}</motion.p>
        </Link>
      )}
      <p style={Style.emailCheck}>Please check your email.</p>
      <input
        type="text"
        name="token"
        id="token"
        placeholder="Verification code here"
        style={Style.input}
      />
      {remainingTime > 0 && (
        <p style={Style.p3}>
          Time remaining to resend: {Math.floor(remainingTime / 60)}:
          {("0" + (remainingTime % 60)).slice(-2)}
        </p>
      )}
      
      {remainingTime < 1 && (<motion.p
        style={Style.resend}
        whileHover={{
          scale: 1.05,
          color: "#1D24CA",
        }}
        onClick={resendEmail}
      >
        resend
      </motion.p>)}
      <motion.button
        style={!isLoading ? Style.button : Style.buttonLoading}
        whileHover={{
          scale: 1.05,
        }}
        type="submit"
      >
        {!isLoading ? "Verify" : "Wait"}
      </motion.button>
    </form>
  );
}

export default Verify;
