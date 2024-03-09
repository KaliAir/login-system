"use client"
import React from 'react'
import { Style } from './styleJS'
import useThemeColors from '@/zustand/theme/themeColor'

function FooterContainer() {
  const {themeColor} = useThemeColors((state)=>({
    themeColor: state.themeColor
  }))
  return (
    <div style={{...Style.container,backgroundColor:`${themeColor.color}`}}>Footer Container</div>
  )
}

export default FooterContainer