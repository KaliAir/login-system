"use client"
import React, { useEffect, useState } from 'react';
import { forgotEmailCheck } from '@/fetch/forgotemailcheck';
import { Style } from './styleJS';
import { motion } from 'framer-motion';
import { generateToken } from '@/fetch/generatetoken';
import { changePass } from '@/fetch/changePass';

function ResendToken({ params: { verify } }) {
  const [verifyVal, setVerifyVal] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [expirationTime, setExpirationTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const decoded = verify ? decodeURIComponent(verify) : '';
    setVerifyVal(decoded);
  }, [verify]);

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

  const handleResend = async () => {
    setResendLoading(true);
    const { verified, error } = await forgotEmailCheck({ email: verifyVal });
    if (error) {
      setResendLoading(false);
      setErrorMessage(error);
      return;
    }
    if (verified) {
      const response = await generateToken({ email: verifyVal });
      const { success, verificationToken: { email, token, expires } } = response;
      if (success) {
        const changePassResponse = await changePass({ email, token });
        const { data } = changePassResponse;
        if (data?.id !== undefined) {
          setResendLoading(false);
          setExpirationTime(new Date(expires).getTime());
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
      <p style={Style.p2}>{verifyVal}</p>
      {remainingTime > 0 && (
        <p style={Style.p3}>Time remaining to resend: {Math.floor(remainingTime / 60)}:{('0' + (remainingTime % 60)).slice(-2)}</p>
      )}
      <motion.button style={Style.button} onClick={handleResend} disabled={resendLoading || remainingTime > 0}
        whileHover={{
          scale: 1.03
        }}>
        {resendLoading ? "Sending..." : remainingTime>0?"Wait...":"Resend"}
      </motion.button>
    </div>
  );
}

export default ResendToken;
