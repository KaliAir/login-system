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
  const handleDrop = () => {
    setDrop(!drop);
  };
  const themeColors = [
    { name: "Ocean Blue", color: "skyblue" },
    { name: "Idian Mekus", color: "indianred" },
    { name: "Penoise Pink", color: "pink" },
    { name: "Korean Leaf", color: "lightgreen" },
  ];

  const handleHoverStart = (theme) => {
    setHoverColor(theme)
  };

  const handleHoverEnd = ()=>{
    setHoverColor({});
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
                onHoverStart={()=>handleHoverStart({id:index,color:colors.color})}
                onHoverEnd={handleHoverEnd}
                onClick={()=>setThemeColor({name:colors.name,color:colors.color})}
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
