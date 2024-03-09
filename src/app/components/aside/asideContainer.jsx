"use client"
import React from 'react'
import { Style } from './styleJS'
import { motion } from 'framer-motion'
import { Motionimate } from '@/framerMotion/motionimate';
import { VscGear } from 'react-icons/vsc';
import useBooleanState from '@/zustand/boolState/trueOrfalse';
import Image from 'next/image';
import Link from 'next/link';
import useThemeColors from '@/zustand/theme/themeColor';


function AsideContainer() {
const {asideButtonColapseState, asideButtonColapseCall} = useBooleanState((state)=>({
  asideButtonColapseState: state.asideButtonColapseState,
  asideButtonColapseCall: state.asideButtonColapseCall,
}))

const {themeColor} = useThemeColors((state)=>({
  themeColor: state.themeColor
}))
  
  return (
    <aside style={!asideButtonColapseState?Style.container:Style.containerColapse}>
      <span style={{...Style.buttonColapse,backgroundColor:`${themeColor.color}`}} onClick={()=> asideButtonColapseCall(!asideButtonColapseState)}>
          <motion.span
            style={Style.gearContainer}
            whileHover={Motionimate.infiniteRotate}
          >
            <VscGear style={Style.buttonGear} />
          </motion.span>
      </span>
      <div style={Style.asideNavigationContainer}>
        <div style={Style.adminLogoinfo}>
          <Link href="/admin">
            <Image width="40" height="40" alt='SideBarLogo' src='/assets/logos/linux.png' style={Style.sidebarLogo}/>
            <h3>Admin</h3>
          </Link>
          <span style={{...Style.span,border:`2px solid ${themeColor.color}`}}></span>
        </div>
        <ul>
          <li></li>
        </ul>
      </div>
    </aside>
  )
}

export default AsideContainer