"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { Style } from './styleJS'
import Image from 'next/image'
import { CiLogout } from "react-icons/ci"
import { motion } from 'framer-motion'
import useThemeColors from '@/zustand/theme/themeColor'

function NavbarContainer() {
  const {themeColor} = useThemeColors((state)=>({
    themeColor: state.themeColor
  }))

  const handleSignOut = ()=>{
    signOut();
  }

  return (
    <div style={Style.container}>
      <div style={Style.navbarBrandIcon}>
        <Image width="55" height="55" alt="BrandLogo" src="/assets/logos/logo.jpeg"/>
      </div>
      <div style={Style.navTitle}>{`[Your company name]`}</div>
      <motion.button onClick={handleSignOut} style={{...Style.button,border:`2px solid ${themeColor.color}`}}
      whileHover={{
        scale:1.05
      }}
      ><CiLogout style={Style.buttonIcon}/><p>Logout</p></motion.button>
    </div>
  )
}

export default NavbarContainer