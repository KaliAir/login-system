"use client";
import React, { useState, useEffect } from "react";
import { VscUnverified } from "react-icons/vsc";
import { Style } from "./styleJS";
import { motion } from "framer-motion";
import { confirm } from "@/fetch/confirm";
import { useRouter } from "next/navigation";
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
  const [remainingTime, setRemainingTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const checkTime = async () => {
      const localStorageData = localStorage.getItem("myData");
      if (localStorageData) {
        const { email, expires } = await verifyemail(JSON.parse(localStorageData));
        if (expires && email) {
          const expirationDate = new Date(expires).getTime();
          const now = new Date().getTime();
          const returnTime = Math.max(0, Math.floor((expirationDate - now) / 1000));
          setRemainingTime(returnTime);
        }else{
          localStorage.removeItem("myData")
          router.push("/login/signup");
        }
        setStoreData(JSON.parse(localStorageData));
      } else {
        localStorage.removeItem("myData")
        router.push("/login/signup");
      }
    };
    checkTime();
  }, [router,refetch]);

  useEffect(() => {
    if (remainingTime !== null) {
      setTimeLeft(remainingTime);
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
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
    const {
      success,
      isEmailFormat,
      error,
      verificationToken:{email, token}
    } = await generateToken(storeData);
    if (error) setErrorMessage(error);
    if (error === "Can't generate please relog") setRelog(true);
    if (success && isEmailFormat) {
      setRefetch(refetch + 1)
      myForm.reset();
      await send({ email, token });

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
          <motion.p whileHover={{ scale: 1.03 }} style={Style.relog}>
            {`->RELOG<-`}
          </motion.p>
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
      {timeLeft > 0 && (
        <p style={Style.p3}>
          Time remaining : {Math.floor(timeLeft / 60)}:
          {("0" + (timeLeft % 60)).slice(-2)}
        </p>
      )}
      {timeLeft < 1 && (
        <motion.p
          style={Style.resend}
          whileHover={{ scale: 1.05, color: "#1D24CA" }}
          onClick={resendEmail}
        >
          resend
        </motion.p>
      )}
      <motion.button
        style={!isLoading ? Style.button : Style.buttonLoading}
        whileHover={{ scale: 1.05 }}
        type="submit"
      >
        {!isLoading ? "Verify" : "Wait"}
      </motion.button>
    </form>
  );
}

export default Verify;
