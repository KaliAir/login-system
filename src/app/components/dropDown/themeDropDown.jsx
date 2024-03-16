"use client";
import React, { useState } from "react";
import { Style } from "./styleJS";
import { CiShirt } from "react-icons/ci";
import { motion } from "framer-motion";
import useThemeColors from "@/zustand/theme/themeColor";

function ThemDropDown() {
  const [drop, setDrop] = useState(false);

  const {hoverColor,setHoverColor,themeColor,setThemeColor} = useThemeColors((state)=>({
    hoverColor: state.hoverColor,
    setHoverColor: state.setHoverColor,
    themeColor: state.themeColor,
    setThemeColor: state.setThemeColor,
  }))

  const themeColors = [
    { name: "Simple Green", color: "#7F9F80" },
    { name: "Moody Pink", color: "#FC819E" },
    { name: "Clean Blue", color: "#51829B" },
    { name: "Light Orange", color: "#ECB159" },
    { name: "Spanish Red", color: "#9B4444" },
    { name: "Maroon Red", color: "#6D2932" },
    { name: "Summer Beige", color: "#FFCF81" },
    { name: "Indian Red", color: "#BF3131" },
  ];

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleHoverStart = (theme) => {
    setHoverColor(theme)
  };

  const handleHoverEnd = ()=>{
    setHoverColor({});
  }

  const setBoth = (theme)=>{
    setThemeColor(theme);
    setHoverColor(theme)
  }

  return (
    <ul style={Style.theme} onClick={handleDrop}>
      <li style={{...Style.buttonContainer,border:`2px solid ${themeColor.color}`,borderRadius:".3rem",padding:".2rem .9rem",}}>
        <CiShirt style={Style.shirt} />
        <p>Theme</p>
      </li>
      {drop ? (
        <ul style={{...Style.ulDropDown,border:`2px solid ${themeColor.color}`}}>
          {themeColors?.map((colors, index) => {
            return (
              <motion.li
                className={`border-b-[1px] border-[${themeColor.color}] pl-2`}
                style={hoverColor.id === index? {
                  backgroundColor: `${colors.color}`,
                  height: "1.5rem",
                }:{height: "1.5rem"}}
                key={index}
                onHoverStart={()=>handleHoverStart({id:index,name:colors.name,color:colors.color})}
                onHoverEnd={handleHoverEnd}
                onClick={()=> setBoth({id:index,name:colors.name,color:colors.color})}
              >
                {colors.name}
              </motion.li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </ul>
  );
}

export default ThemDropDown;
