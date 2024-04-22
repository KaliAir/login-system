"use client"
import React,{useEffect, useState} from "react";
import { Style } from "./styleJS";
import AsideContainer from "../components/aside/asideContainer";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { useMediaQuery } from "react-responsive";
import LibraryModal from "../components/modal/libraryModal";


function MainContent({ children }) {
  const phone = useMediaQuery({maxWidth:767})
  const [phoneState,setPhoneState] = useState(null);

  const {
    asideButtonColapseState,
    itemLibraryState,

  } = useCreateObj((state)=>({
    asideButtonColapseState: state.asideButtonColapseState,
    itemLibraryState: state.itemLibraryState,
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
      {
        itemLibraryState?(
          <div style={Style.libraryContainer}>
            <LibraryModal/>
          </div>
        ):
        ""
      }
      <AsideContainer/>
      <span style={Style.span}></span>
      <main style={Style.main}>
        <section style={Style.section}>{children}</section>
      </main>
    </div>
  );
}

export default MainContent;
