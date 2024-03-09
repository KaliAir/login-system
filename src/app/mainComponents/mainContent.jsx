"use client"
import React from "react";
import { Style } from "./styleJS";
import AsideContainer from "../components/aside/asideContainer";
import useBooleanState from "@/zustand/boolState/trueOrfalse";
import { useMediaQuery } from "react-responsive";


function MainContent({ children }) {
  const phone = useMediaQuery({maxWidth:767})

  const {asideButtonColapseState} = useBooleanState((state)=>({
    asideButtonColapseState: state.asideButtonColapseState
  }))

  return (
    <div style={!asideButtonColapseState && !phone?Style.contentWrapper:Style.contentWrapperColapse}>
      <AsideContainer/>
      <span style={Style.span}></span>
      <main style={Style.main}>
        <section style={Style.section}>{children}</section>
      </main>
    </div>
  );
}

export default MainContent;
