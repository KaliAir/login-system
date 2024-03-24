"use client";
import React from "react";
import { Style } from "./styleJS";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import useThemeColors from "@/zustand/theme/themeColor";
import { motion } from "framer-motion";
import useBooleanState from "@/zustand/boolState/trueOrfalse";

function Manage() {
  const { themeColor } = useThemeColors((state) => ({
    themeColor: state.themeColor,
  }));
  const { searchButton, setSearchButton,addButton,setAddButton } = useBooleanState((state) => ({
    searchButton: state.searchButton,
    setSearchButton: state.setSearchButton,
    addButton: state.addButton,
    setAddButton: state.setAddButton
  }));

  return (
    <div style={Style.mainContainer}>
      <div style={Style.categoryContainer}>
        {/* -----------------CATEGORY Search and Add--------------- */}
        <div
          style={
            !searchButton
              ? {
                  ...Style.addCategoryContainer,
                  backgroundColor: `${themeColor.color}`,
                }
              : {
                  ...Style.addCategoryContainerSwitch,
                  backgroundColor: `${themeColor.color}`,
                }
          }
        >
          <div style={addButton?Style.addCategoryFormDown:Style.addCategoryFormUp}>
            Add Category Form
          </div>
          <MdCategory style={Style.categoryIcon} />
          {!searchButton ? (
            <p style={Style.categoryLabel}>Category</p>
          ) : (
            <label htmlFor="search" style={Style.label}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search category..."
                style={Style.input}
              />
              <MdClose
                style={Style.mdClose}
                onClick={() => setSearchButton(!searchButton)}
              />
            </label>
          )}

          {!searchButton ? (
            <motion.span
              style={Style.searchIcon}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => setSearchButton(!searchButton)}
            >
              <FaSearch />
            </motion.span>
          ) : (
            ""
          )}

          <motion.span
            style={Style.addIcon}
            whileHover={{
              scale: 1.1,
            }}
            onClick={()=> setAddButton(!addButton)}
          >
            <FaPlus />
          </motion.span>
        </div>
        {/* -----------------------------------Category Search and Add End's Here--------------- */}
        <ul style={Style.categoryListContainer}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </ul>
      </div>
      <div>Add Items</div>
      <div>Item Detials</div>
    </div>
  );
}

export default Manage;
