"use client"
import React,{useState, useEffect} from 'react'
import { checkToken } from '@/fetch/checkToken'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Style } from './styleJS'
import { resetPassword } from '@/fetch/resetpassword'

function ChangePassword({params:{change}}) {
    const router = useRouter()
    const [errorRes, setErrorRes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [tokenVal, setTokenVal] = useState('');
    useEffect(()=>{
        const tokenExists = async()=>{
            const {success} = await checkToken({token:change});
            if(!success){
                router.push('/login');
            }
        }
        if(change){
         setTokenVal(change)
         tokenExists();
        }
    },[]);

    const handleChangePass = async(e)=>{
        e.preventDefault();
        setSubmitting(true)
        const formData = new FormData(e.target);
        const dataObj = Object.fromEntries(formData);
        const {success, error} = await resetPassword(dataObj)
        if(success){
            setSubmitting(false)
            router.push('/login');
        }else{
            setErrorRes(error)
            setSubmitting(false)
        }        
    }
  return (
    <form
      onSubmit={handleChangePass}
      style={Style.SignUpFormContainer}
    >
        
      <h1  style={Style.signup}>
        Change Password
      </h1>
      <motion.p style={Style.validate}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >{errorRes}</motion.p>
      <label htmlFor="password">
        <p>New Password</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Ex:Johndoe*123"
          style={Style.input}
        />
      </label>
      <label htmlFor="retype">
        <p>Re-Type Password</p>
        <input
          type="password"
          name="retype"
          id="retype"
          placeholder="Re-type your password"
          style={Style.input}
        />
      </label>
      <input type="hidden" name='token' id='token' value={tokenVal} />
      <motion.button
        style={!submitting?Style.button:Style.buttonLoad}
        whileHover={{
          scale: 1.05,
        }}
        disabled={submitting}
      >
        {!submitting?"Submit":"Wait"}
      </motion.button>
      
    </form>
  )
}

export default ChangePassword