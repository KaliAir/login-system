"use client"
import React, { useEffect, useState } from 'react';
import { forgotEmailCheck } from '@/fetch/forgotemailcheck';
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import { generateToken } from '@/fetch/generatetoken';
import { changePass } from '@/fetch/changePass';
import { verifyemail } from '@/fetch/verifyemail';
import { useRouter } from 'next/navigation';

function ResendToken({ params: { verify } }) {
  const router = useRouter();
  const [verifyVal, setVerifyVal] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const checkTime = async () => {
      const decoded = verify ? decodeURIComponent(verify) : '';
      if(decoded){
        const { email, expires } = await verifyemail({email:decoded});
        if(expires && email){
          const expirationDate = new Date(expires).getTime();
          const now = new Date().getTime();
          const returnTime = Math.max(0, Math.floor((expirationDate - now) / 1000));
          setRemainingTime(returnTime);
        }else{
          router.push("/login");
        }
        setVerifyVal({email:decoded})
      }else{
        router.push("/login");
      }
    }
    checkTime();
  }, [router, refetch]);

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

  const handleResend = async () => {
    setResendLoading(true);
    const { verified, error } = await forgotEmailCheck(verifyVal);
    if (error) {
      setResendLoading(false);
      setErrorMessage(error);
      return;
    }
    if (verified) {
      const response = await generateToken(verifyVal);
      const { success, verificationToken: { email, token} } = response;
      if (success) {
        setRefetch(refetch + 1)
        const changePassResponse = await changePass({ email, token });
        const { data } = changePassResponse;
        if (data?.id !== undefined) {
          setResendLoading(false);
        }
      }
    } else {
      setResendLoading(false);
      setErrorMessage(error);
    }
  };

  return (
    <div style={Style.resendContainer}>
      <p style={Style.errorMessage}>{errorMessage}</p>
      <h1 style={Style.h1}>Password Reset</h1>
      <p style={Style.p1}>Please check your email:</p>
      <p style={Style.p2}>{verifyVal.email}</p>
      {timeLeft > 0 && (
        <p style={Style.p3}>
          Time remaining : {Math.floor(timeLeft / 60)}:
          {("0" + (timeLeft % 60)).slice(-2)}
        </p>
      )}
      <motion.button style={Style.button} onClick={handleResend} disabled={resendLoading || timeLeft > 0}
        whileHover={{
          scale: 1.03
        }}>
        {resendLoading ? "Sending..." : timeLeft > 0?"Wait...":"Resend"}
      </motion.button>
    </div>
  );
}

export default ResendToken;
