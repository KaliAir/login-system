"use client"
import React from 'react'
import { Style } from './styleJS'
import ThemDropDown from '../dropDown/themeDropDown'
import useThemeColors from '@/zustand/theme/themeColor'

function HeaderContainer() {
  const{themeColor} = useThemeColors((state)=>({
    themeColor: state.themeColor
  }))
  return (
    <div style={{...Style.container,backgroundColor:`${themeColor.color}`}}>
      <p>Notice: this is notice from the admin</p>
      <ThemDropDown/>
    </div>

  )
}

export default HeaderContainer