"use client"
import React,{useEffect, useState} from "react";
import { Style } from "./styleJS";
import AsideContainer from "../components/aside/asideContainer";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { useMediaQuery } from "react-responsive";


function MainContent({ children }) {
  const phone = useMediaQuery({maxWidth:767})
  const [phoneState,setPhoneState] = useState(null);

  const {asideButtonColapseState} = useCreateObj((state)=>({
    asideButtonColapseState: state.asideButtonColapseState
  }))

  useEffect(()=>{
    if(phone){
      setPhoneState(true)
    }else{
      setPhoneState(false)
    }
  },[phone])

  return (
    <div style={!asideButtonColapseState && !phoneState?Style.contentWrapper:Style.contentWrapperColapse}>
      <AsideContainer/>
      <span style={Style.span}></span>
      <main style={Style.main}>
        <section style={Style.section}>{children}</section>
      </main>
    </div>
  );
}

export default MainContent;
