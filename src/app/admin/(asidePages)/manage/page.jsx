"use client";
import React, { useState, useEffect } from "react";
import { Style } from "./styleJS";
import { FaPlus, FaSearch, FaTrash, FaEdit, FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { CgInsertAfterO } from "react-icons/cg";
import useThemeColors from "@/zustand/theme/themeColor";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import './styleCSS.css'

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

  const xl = useMediaQuery({ maxWidth: 1280 });
  const [xlScreen, setXlScreen] = useState(null);
  useEffect(() => {
    if (xl) {
      setXlScreen(true);
    } else {
      setXlScreen(false);
    }
  }, [xl]);

  const lg = useMediaQuery({ maxWidth: 1024 });
  const [lgScreen, setLgScreen] = useState(null);
  useEffect(() => {
    if (lg) {
      setLgScreen(true);
    } else {
      setLgScreen(false);
    }
  }, [lg]);
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
    getCategories,
    catRes,
    showEditIcon,
    setShowEditIcon,
    editIconState,
    setEditIconState,
    categoryRefetch,
    setCategoryRefetch,

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
    setSubmitButtonState: state.setSubmitButtonState,
    getCategories: state.getCategories,
    catRes: state.catRes,
    showEditIcon: state.showEditIcon,
    setShowEditIcon: state.setShowEditIcon,
    editIconState: state.editIconState,
    setEditIconState: state.setEditIconState,
    categoryRefetch: state.categoryRefetch,
    setCategoryRefetch: state.setCategoryRefetch
  }));

  //----------------------------Insert Category on a list located at Zustand-----------------
  const insertToArray = () => {
    if (insertValue.trim() !== "" && insertList.length < 5) {
      setInsertList(insertValue);
      setInsertValue("");
    }
  };
  //----------------------------Create Category base on user's id--------------
  const handleSubmit = ()=>{
    if(insertList.length > 0){
      createCategory(session?.user.id);
      setInsertValue("");
      setSubmitButtonState(true)
    }
  }
  //---------------------------onHoverEnd do this ---------------------
  const handleCategoryHover = ()=>{
    setShowEditIcon(null);
    setEditIconState(null);
  }
  //-----------------------Fetch Categroy base on user's id-----------
  useEffect(()=>{
    getCategories(session?.user.id)
  },[categoryRefetch])
  // ----------------------------Search Category Process-------------------
  const [searchVal, setSearchVal] = useState("") //-----search value @ <input/>  (1)
  const [bounceVal] = useDebounce(searchVal,400)//----add interval of search <input/> (2)
  const [filterVal,setFilterVal] = useState([]) //-----Filtered Data-------(4)
  const [currentCategory, setCurrentCategory] = useState([]) //-------This is the Current data now---(8)
  const [catOffset, setCatOffset] = useState(0) //---Category Offset range--(5)
  const categoryPerPage = 10; //-----Category per pages--(6)
  const [pageCount, setPageCount] = useState(1) //-------------pages---(9)
  const [selected, setSelected] = useState(0) //--------the value of the tab you selected---(11)-----press ctrl F to find 12
  
  //------------Event from input search----(0)
  const handleSearchVal = (e)=>{
    e.preventDefault()
    setSearchVal(e.target.value)
  }
  //-------------------Filter Data from category response-------(3)
  useEffect(()=>{
    if(catRes.length > 0){
      const filterData = catRes.filter((res)=>{
        return bounceVal?
        res.category.toLowerCase().includes(bounceVal.toLowerCase())
        : true;
      })
      setFilterVal(filterData)
    }
  },[bounceVal,catRes])
  //-------End of filtering---------

  const handleCloseSearchButton = ()=>{
    setSearchButton(!searchButton)
    setSearchVal("")
  }
  //-------------Processing the offset------(7)
  useEffect(()=>{
    const endOffset = catOffset + categoryPerPage
    if(catRes.length > 0){
      setCurrentCategory(filterVal.slice(catOffset, endOffset))
      setPageCount(Math.ceil(filterVal.length / categoryPerPage))
    }
  },[filterVal, catOffset, categoryPerPage])
  //-------------End of process------------

  //---------------Get The event from the pagination, that event is the tab you selected----------------(10)
  const handlePageClick = (event) => {
    if (catRes.length > 0) {
      setSelected(event.selected);
      const newOffset = (event.selected * categoryPerPage) % filterVal.length;
      setCatOffset(newOffset);
    }
  }
  //-----------------------this is how to fix bug of searching with pagination----------(13)
  useEffect(() => {
    if (bounceVal && selected > 0) {
      setSelected(0);
      setCatOffset(0);
    }
  }, [bounceVal]);

  // ----------------------------Search Category End----------------------
  const handleSetEditIconState = (id)=>{
    setEditIconState(id)
  }
  
 
  return (
    <div style={lgScreen?Style.mainContainerXL:Style.mainContainer}> 
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
                  value={searchVal}
                  onChange={handleSearchVal}
                />
                <MdClose
                  style={Style.mdClose}
                  onClick={handleCloseSearchButton}
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
          {
             catRes.length > 0 && currentCategory?.map((res)=>{
              return(
                <motion.li key={res.id} style={Style.categoryList}
                onHoverStart={()=> smScreen? "":setShowEditIcon(res.id)}
                onHoverEnd={handleCategoryHover}
                >
                  <p style={Style.categoryResponse}>{res.category}</p>

                  {showEditIcon && showEditIcon === res.id || smScreen?
                  //------------------------------------SHOW EDIT ICON-------------------------------------
                  editIconState !== res.id?
                  (<FaEdit style={Style.editCategoryIcon} onClick={()=> handleSetEditIconState(res.id)}/>)
                  :
                  //------------------------------------SHOW PEN AND DELETE ICON------------------------------
                  (<AnimatePresence>
                  <motion.span style={Style.showCategoryEditItem}
                    initial={smScreen?{ opacity: 0 }:{ right: "-2rem" }}
                    animate={smScreen?{ opacity:1}:{ right: ".5rem" }}
                    exit={smScreen?{opacity:0}:{ right: "-2rem" }}
                  >
                    <motion.span style={Style.categoryEditPenIcon}
                    whileHover={{
                      color:"#78A083"
                    }}
                    >
                      <FaPen/>
                    </motion.span>
                    <motion.span style={Style.categoryDeleteIcon}
                    whileHover={{
                      color:"#7D0A0A"
                    }}
                    >
                      <FaTrash/>
                    </motion.span>
                  </motion.span>
                  </AnimatePresence>)
                  :
                  // -----------------------------NO SHOW-------------------------------------
                  (<motion.span
                  initial={smScreen?{ opacity: 0 }:{ right: "-2rem" }}
                  animate={smScreen?{ opacity:1}:{ right: ".5rem" }}
                  exit={smScreen?{opacity:0}:{ right: "-2rem" }}
                  ></motion.span>)
                  //--------------------SHOW----------------------------------
                  }
                </motion.li>
              )
            })
          }
        </ul>
        
        <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              previousLabel="<"
              onPageChange={handlePageClick}  //------------handlePage carries event and the styleCSS.css must be imported here----------------(12)
              pageRangeDisplayed={3}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
              forcePage={selected}
            />
      </div>
      <div>Add Items</div>
      <div>Item Detials</div>
    </div>
  );
}

export default Manage;
