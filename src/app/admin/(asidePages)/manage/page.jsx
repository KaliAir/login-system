"use client";
import React, { useState, useEffect } from "react";
import { Style } from "./styleJS";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { CgInsertAfterO } from "react-icons/cg";
import useThemeColors from "@/zustand/theme/themeColor";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";

function Manage() {
  const [insertValue, setInsertValue] = useState("");
  const {data:session} = useSession();
  // -----------------Responsive Breaking Points------------
  const sm = useMediaQuery({ maxWidth: 640 });
  const [smScreen, setSmScreen] = useState(null);
  useEffect(() => {
    if (sm) {
      setSmScreen(true);
    } else {
      setSmScreen(false);
    }
  }, [sm]);
  //------------------End Responsive------------------------------
  const { themeColor } = useThemeColors((state) => ({
    themeColor: state.themeColor,
  }));

  const {
    insertList,
    setInsertList,
    insertId,
    setInsertId,
    removeInsertedList,
    createCategory,
    searchButton,
    setSearchButton,
    addButton,
    setAddButton,
    submitButtonState,
    setSubmitButtonState,
  } = useCreateObj((state) => ({
    insertList: state.insertList,
    setInsertList: state.setInserList,
    insertId: state.insertId,
    setInsertId: state.setInsertId,
    removeInsertedList: state.removeInsertedList,
    createCategory: state.createCategory,
    searchButton: state.searchButton,
    setSearchButton: state.setSearchButton,
    addButton: state.addButton,
    setAddButton: state.setAddButton,
    submitButtonState: state.submitButtonState,
    setSubmitButtonState: state.setSubmitButtonState
  }));
  const insertToArray = () => {
    if (insertValue.trim() !== "" && insertList.length < 5) {
      setInsertList(insertValue);
      setInsertValue("");
    }
  };
  const handleSubmit = ()=>{
    if(insertList.length > 0){
      createCategory(session.user.id);
      setInsertValue("");
      setSubmitButtonState(true)
    }
  }

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
          {/* ---------------Insert Categories-------------------------- */}
          <div
            style={
              addButton ? Style.addCategoryFormDown : Style.addCategoryFormUp
            }
          >
            <label
              htmlFor="insertcat"
              style={{
                ...Style.insertCat,
                border: `2px solid ${themeColor.color}`,
              }}
            >
              <input
                type="text"
                name="insertcat"
                id="insertcat"
                placeholder="Insert Categories..."
                style={Style.insertInput}
                onChange={(e) => setInsertValue(e.target.value)}
                value={insertValue}
              />
              <motion.span
                whileHover={{
                  scale: 1.1,
                }}
                onClick={insertToArray}
              >
                <CgInsertAfterO style={Style.insertButton} />
              </motion.span>
            </label>
            <ul style={Style.inertCatList}>
              {insertList.map((list, index) => {
                return (
                  <motion.li
                    key={index}
                    style={Style.ulItems}
                    onHoverStart={() => setInsertId(index + 1)}
                    onHoverEnd={() => setInsertId(null)}
                  >
                    <p>{list}</p>
                    {(insertId && insertId === index + 1) ||
                    (smScreen && smScreen) ? (
                      <motion.span
                        style={Style.listTrashIcon}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeInsertedList(index)}
                      >
                        <FaTrash />
                      </motion.span>
                    ) : (
                      ""
                    )}
                  </motion.li>
                );
              })}
            </ul>
            <motion.button style={!submitButtonState?{...Style.submit,backgroundColor:`${themeColor.color}`}:{...Style.submit,border:`2px solid ${themeColor.color}`}}
            whileHover={{
              scale:1.02,
            }}
            onClick={handleSubmit}
            >{!submitButtonState?"Submit":"Wait..."}</motion.button>
          </div>
          {/* ---------------End Insert Categories-------------------------- */}
          <MdCategory style={Style.categoryIcon} />
          <AnimatePresence>
            {!searchButton ? (
              <motion.p
                style={Style.categoryLabel}
                key="modal"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                Category
              </motion.p>
            ) : (
              <motion.label
                htmlFor="search"
                style={Style.label}
                key="modal"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search category..."
                  style={{ ...Style.input }}
                />
                <MdClose
                  style={Style.mdClose}
                  onClick={() => setSearchButton(!searchButton)}
                />
              </motion.label>
            )}
          </AnimatePresence>

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

          {!addButton ? (
            <motion.span
              style={Style.addIcon}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => setAddButton(!addButton)}
            >
              <FaPlus />
            </motion.span>
          ) : (
            <motion.span
              style={Style.addIcon}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => setAddButton(!addButton)}
            >
              <MdClose style={Style.plusClose} />
            </motion.span>
          )}
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
