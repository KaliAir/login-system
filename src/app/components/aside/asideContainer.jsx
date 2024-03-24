"use client"
import React, { useEffect, useState } from 'react'
import { Style } from './styleJS'
import { motion } from 'framer-motion'
import { Motionimate } from '@/framerMotion/motionimate';
import { VscGear } from 'react-icons/vsc';
import useCreateObj from '@/zustand/tempValue/temporaryVal';
import Image from 'next/image';
import Link from 'next/link';
import useThemeColors from '@/zustand/theme/themeColor';
import { useMediaQuery } from 'react-responsive';
import { sideNavItems } from './sideNavItems';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { usePathname } from 'next/navigation';


function AsideContainer() {
  const [floatItem,setFloatItem] = useState(null)
  const [hoverNavItems,setHoverNavItems] = useState(null)
  const phoneGear = useMediaQuery({maxWidth:767})
  const [phoneGearState,setPhoneGearState] = useState(null)
  const path = usePathname()

  useEffect(()=>{
    if(phoneGear){
      setPhoneGearState(true)
    }else{
      setPhoneGearState(false)
    }
  },[phoneGear])

const {asideButtonColapseState, asideButtonColapseCall} = useCreateObj((state)=>({
  asideButtonColapseState: state.asideButtonColapseState,
  asideButtonColapseCall: state.asideButtonColapseCall,
}))

const {themeColor} = useThemeColors((state)=>({
  themeColor: state.themeColor
}))

  return (
    <aside style={!asideButtonColapseState?Style.container : Style.containerColapse}>
      <span style={phoneGearState?{...Style.buttonColapseSmall,backgroundColor : `${themeColor.color}`}:{...Style.buttonColapse,backgroundColor : `${themeColor.color}`}} onClick={()=> asideButtonColapseCall(!asideButtonColapseState)}>
          <motion.span
            style={phoneGearState?Style.gearContainerSmall:Style.gearContainer}
            whileHover={phoneGearState?Motionimate.hoverButton:Motionimate.infiniteRotate}
          >
            {!phoneGearState?(<VscGear style={Style.buttonGear}/>):asideButtonColapseState?(<IoIosArrowForward style={Style.buttonGear}/>):(<IoIosArrowBack style={Style.buttonGear}/>)}
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
        {/* --------------------------SIDE BAR MENU------------------ */}
        <div style={Style.asideNavItems}>
          {
            sideNavItems.map((items,index)=>{
              return(
                <motion.div style={path === items.route?{...Style.sideNavItems,borderBottom:`4px solid ${themeColor.color}`}:Style.sideNavItems}
                onHoverStart={()=> setHoverNavItems(items.id)}
                onHoverEnd={()=> setHoverNavItems(null)}
                key={index}
                >
                  <Link  href={items.route}  style={hoverNavItems && hoverNavItems === items.id?{color:themeColor.color}:{color:'rgb(0,0,0,.8)'}}>{items.name}</Link>
                </motion.div>
              )
            })
          }
        </div>

      </div>
    </aside>
  )
}

export default AsideContainer