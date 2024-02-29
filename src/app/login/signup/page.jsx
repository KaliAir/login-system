"use client";
import Link from "next/link";
import React from "react";
import { Style } from "./styleJS";
import { motion } from "framer-motion";
import userSignUpState from "@/zustand/authState/signUpState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateToken } from "@/fetch/generatetoken";
import { send } from "@/fetch/send";
import { verifyemail } from "@/fetch/verifyemail";

function SignUp() {
  const router = useRouter();
  const [errorRes, setErrorRes] = useState("");
  const [submitting,setSubmitting] = useState(false);

  const { createUser } = userSignUpState((state) => ({
    createUser: state.createUser,
  }));

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    const { success, error } = await createUser(dataObj);
    if (success) {
      const { success } = await generateToken({ email: dataObj.email });
      if (success) {
        const { email, token } = await verifyemail({ email: dataObj.email });
        const sendEmail = await send({ email, token });
        setSubmitting(false);
        router.push(`/login/signup/${email}`);
      }
    } else {
      setErrorRes(error);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      style={Style.SignUpFormContainer}
    >
        
      <h1  style={Style.signup}>
        Sign Up
      </h1>
      <motion.p style={Style.validate}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >{errorRes}</motion.p>
      <label htmlFor="name">
        <p>Name</p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Type your name"
          style={Style.input}
        />
      </label>
      <label htmlFor="lastname">
        <p>Last Name</p>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Type your last name"
          style={Style.input}
        />
      </label>
      <label htmlFor="email">
        <p>email</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Type your email"
          style={Style.input}
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          style={Style.input}
        />
      </label>
      <p style={Style.loginHere}>
        Already have account?{" "}
        <Link href="/login" style={Style.loginHereColor}>
          Login here
        </Link>
      </p>
      <motion.button
        style={!submitting?Style.button:Style.buttonLoad}
        whileHover={{
          scale: 1.05,
        }}
        disabled={submitting}
      >
        {!submitting?"Submit":"Wait"}
      </motion.button>
      <p style={Style.terms}>
        By clicking the Sign Up button, you agree to our Terms and{" "}
        <Link href="/condition" style={Style.termsLink}>
          Condition
        </Link>{" "}
        and{" "}
        <Link href="/privacy" style={Style.termsLink}>
          Privacy Policy
        </Link>{" "}
      </p>
    </form>
  );
}

export default SignUp;
