"use client";
import React, { useState, useEffect } from "react";
import { Style } from "./styleJS";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaPen,
  FaCheck,
  FaImage,
} from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { TiThList } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { CgInsertAfterO } from "react-icons/cg";
import useThemeColors from "@/zustand/theme/themeColor";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { motion, AnimatePresence } from "framer-motion";
import { Motionimate } from "@/framerMotion/motionimate";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import "./styleCSS.css";

function Manage() {
  const router = useRouter();
  const [insertValue, setInsertValue] = useState("");
  const [itemError, setItemError ] = useState({});
  const [imageUpload, setImageUpload] = useState("");
  const [onUpdateChange, setOnUpadateChange] = useState("");
  const { data: session, status } = useSession();

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

  const xxl = useMediaQuery({ maxWidth: 1400 });
  const [xxlScreen, setXxlScreen] = useState(null);
  useEffect(() => {
    if (xxl) {
      setXxlScreen(true);
    } else {
      setXxlScreen(false);
    }
  }, [xxl]);

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
    updateDelete,
    setUpdateDelete,
    confirmUpdateDelete,
    setConfirmUpdateDelete,
    confirmDeleteCategory,
    deleteCategoryRes,
    deleteUpdateState,
    setDeleteUpdateState,
    showInputUpdate,
    setShowInputUpdate,
    setUpdateCategory,
    getCategoryName,
    setGetCategoryName,
    categoryHover,
    setCategoryHover,
    itemSearchButton,
    setItemSearchButton,
    itemSearchVal,
    setItemSearchVal,
    itemAddButton,
    setItemAddButton,
    submitItemButtonState,
    setSubmitItemButtonState,
    setCreateItems,
    createItemsRes,
    showCreatedItems,
    setShowCreatedItems,
    itemRefetch,
    setItemRefetch,

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
    setCategoryRefetch: state.setCategoryRefetch,
    updateDelete: state.updateDelete,
    setUpdateDelete: state.setUpdateDelete,
    confirmUpdateDelete: state.confirmUpdateDelete,
    setConfirmUpdateDelete: state.setConfirmUpdateDelete,
    confirmDeleteCategory: state.confirmDeleteCategory,
    deleteCategoryRes: state.deleteCategoryRes,
    deleteUpdateState: state.deleteUpdateState,
    setDeleteUpdateState: state.setDeleteUpdateState,
    showInputUpdate: state.showInputUpdate,
    setShowInputUpdate: state.setShowInputUpdate,
    setUpdateCategory: state.setUpdateCategory,
    getCategoryName: state.getCategoryName,
    setGetCategoryName: state.setGetCategoryName,
    categoryHover: state.categoryHover,
    setCategoryHover: state.setCategoryHover,
    itemSearchButton: state.itemSearchButton,
    setItemSearchButton: state.setItemSearchButton,
    itemSearchVal: state.itemSearchVal,
    setItemSearchVal: state.setItemSearchVal,
    itemAddButton: state.itemAddButton,
    setItemAddButton: state.setItemAddButton,
    submitItemButtonState: state.submitItemButtonState,
    setSubmitItemButtonState: state.setSubmitItemButtonState,
    setCreateItems: state.setCreateItems,
    createItemsRes: state.createItemsRes,
    showCreatedItems: state.showCreatedItems,
    setShowCreatedItems: state.setShowCreatedItems,
    itemRefetch: state.itemRefetch,
    setItemRefetch: state.setItemRefetch,

  }));

  useEffect(() => {
    if (session && status === "authenticated") {
      getCategories(session?.user.id);
    } else {
      router.push("/admin");
    }
  }, [categoryRefetch, session]);
  useEffect(() => {
    if (getCategoryName) {
      setDeleteUpdateState(getCategoryName.categoryId)
      const callItemRes = async()=>{
        const res = await setShowCreatedItems(getCategoryName);
        setDeleteUpdateState(null)
      }
      callItemRes();
      
    }
  }, [getCategoryName,itemRefetch]);

  //----------------------------Insert Category on a list located at Zustand-----------------
  const insertToArray = () => {
    if (insertValue.trim() !== "" && insertList.length < 10) {
      setInsertList(insertValue);
      setInsertValue("");
    }
  };

  //----------------------------Create Category base on user's id--------------
  const handleSubmit = () => {
    if (insertList.length > 0) {
      createCategory(session?.user.id);
      setInsertValue("");
      setSubmitButtonState(true);
    }
  };
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    setSubmitItemButtonState(true);
    const itemCallRes = await setCreateItems(dataObj);
    if(itemCallRes.error){
      setItemError(itemCallRes.error)
    }
    const formReset = document.querySelector("#itemForm");
    if (itemCallRes.success) {
      formReset.reset();
      setItemRefetch()
      setSubmitItemButtonState(false);
    } else {
      setSubmitItemButtonState(false);
    }
  };
  //---------------------------onHoverEnd do this ---------------------
  const handleCategoryHoverEnd = () => {
    setShowEditIcon(null);
    setEditIconState(null);
    setConfirmUpdateDelete("");
    setUpdateDelete(null);
    setShowInputUpdate(null);
  };

  // ----------------------------Search Category Process-------------------
  //Note: if you have big data and your ORM is Prisma you can use the SKIP and TAKE method
  //first you need to get the Event.selected and categoryPerPage in the pagination.
  //then in await prisma.category.findMany({ skip: event.selected value, take: categoryPerPage Val.})
  //also get the count of data in you category: await prisma.category.count()
  //because in count you need it in pagination to set the setPageCount

  const [searchVal, setSearchVal] = useState(""); //search value @ <input/>  (1)
  const [bounceVal] = useDebounce(searchVal, 400); //add interval of search <input/> (2)
  const [filterVal, setFilterVal] = useState([]); //Filtered Data (4)
  const [currentCategory, setCurrentCategory] = useState([]); //This is the Current data now (8)
  const [catOffset, setCatOffset] = useState(0); //Category Offset range (5)
  const categoryPerPage = 10; //Category per pagesn (6)
  const [pageCount, setPageCount] = useState(1); //pages (9)
  const [selected, setSelected] = useState(0); //the value of the tab you selected (11) press ctrl F to find 12

  //Event from input search (0)
  const handleSearchVal = (e) => {
    e.preventDefault();
    setSearchVal(e.target.value);
  };
  //Filter Data from category response (3)
  useEffect(() => {
    if (catRes.length > 0) {
      const filterData = catRes.filter((res) => {
        return bounceVal
          ? res.category.toLowerCase().includes(bounceVal.toLowerCase())
          : true;
      });
      setFilterVal(filterData);
    }
  }, [bounceVal, catRes]);
  //-------End of filtering---------

  const handleCloseSearchButton = () => {
    setSearchButton(!searchButton);
    setSearchVal("");
  };
  //Processing the offset (7)
  useEffect(() => {
    const endOffset = catOffset + categoryPerPage; //10+ 10
    if (catRes.length > 0) {
      setCurrentCategory(filterVal.slice(catOffset, endOffset));
      setPageCount(Math.ceil(filterVal.length / categoryPerPage));
    }
  }, [filterVal, catOffset, categoryPerPage]);
  //-------------End of process------------

  //Get The event from the pagination, that event is the tab you selected (10)
  const handlePageClick = (event) => {
    if (catRes.length > 0) {
      setSelected(event.selected);
      const newOffset = (event.selected * categoryPerPage) % filterVal.length;
      setCatOffset(newOffset);
    }
  };
  //this is how to fix bug of searching with pagination (13)
  useEffect(() => {
    if (bounceVal && selected > 0) {
      setSelected(0);
      setCatOffset(0);
    }
  }, [bounceVal]);

  // ----------------------------Search Category End----------------------

  // ----------------------------Search Item Process-------------------

  const [searchItemVal, setSearchItemVal] = useState(""); //search value @ <input/>  (1)
  const [bounceItemVal] = useDebounce(searchItemVal, 400); //add interval of search <input/> (2)
  const [filterItemVal, setFilterItemVal] = useState([]); //Filtered Data (4)
  const [currentItem, setCurrentItem] = useState([]); //This is the Current data now (8)
  const [itemOffset, setItemOffset] = useState(0); //Category Offset range (5)
  const itemPerPage = 10; //Category per pagesn (6)
  const [itemPageCount, setItemPageCount] = useState(1); //pages (9)
  const [selectedItem, setSelectedItem] = useState(0); //the value of the tab you selected (11) press ctrl F to find 12

  //Event from input search (0)
  const handleItemSearchVal = (e) => {
    e.preventDefault();
    setSearchItemVal(e.target.value);
  };
  //Filter Data from category response (3)
  useEffect(() => {
    if (showCreatedItems.length > 0) {
      const filterData = showCreatedItems.filter((res) => {
        return bounceItemVal
          ? res.itemName.toLowerCase().includes(bounceItemVal.toLowerCase())
          : true;
      });
      setFilterItemVal(filterData);
    }
  }, [bounceItemVal, showCreatedItems]);
  //-------End of filtering---------

  const handleItemCloseSearchButton = () => {
    setSearchButton(!searchButton);
    setSearchVal("");
  };
  //Processing the offset (7)
  useEffect(() => {
    const endOffset = itemOffset + itemPerPage; //10+ 10
    if (showCreatedItems.length > 0) {
      setCurrentItem(filterItemVal.slice(itemOffset, endOffset));
      setItemPageCount(Math.ceil(filterItemVal.length / itemPerPage));
    }
  }, [filterItemVal, itemOffset, itemPerPage]);
  //-------------End of process------------

  //Get The event from the pagination, that event is the tab you selected (10)
  const handleItemPageClick = (event) => {
    if (showCreatedItems.length > 0) {
      setSelectedItem(event.selected);
      const newOffset = (event.selected * itemPerPage) % filterItemVal.length;
      setItemOffset(newOffset);
    }
  };
  //this is how to fix bug of searching with pagination (13)
  useEffect(() => {
    if (bounceItemVal && selected > 0) {
      setSelectedItem(0);
      setItemOffset(0);
    }
  }, [bounceItemVal]);

  // ----------------------------Search Item End----------------------

  const unitList = [
    "pcs",
    "len",
    "kls",
    "bag",
    "bundle",
    "meter",
    "inch",
    "ruler",
    "pair",
    "set",
  ];

  const handleSetEditIconState = (id) => {
    if (deleteUpdateState !== id) {
      setEditIconState(id);
    }
  };

  const handleDeleteCat = (id) => {
    setUpdateDelete(id);
    setConfirmUpdateDelete("delete");
  };

  const handleUpdateCat = (id) => {
    setShowInputUpdate(id);
    setUpdateDelete(id);
    setConfirmUpdateDelete("update");
  };
  const handleConfirmDeleteCategory = (deleteCategoryInfo) => {
    setDeleteUpdateState(deleteCategoryInfo?.catId);
    confirmDeleteCategory(deleteCategoryInfo);
  };

  const handleCancelDelete = () => {
    setConfirmUpdateDelete("");
    setUpdateDelete(null);
  };
  const handleNewCategoryName = (dataObj) => {
    if (dataObj.newCat.trim() !== "") {
      setUpdateCategory(dataObj);
      setDeleteUpdateState(dataObj?.catId);
      setShowInputUpdate(null);
    }
  };

  const handleCancelUpdate = () => {
    setConfirmUpdateDelete("");
    setUpdateDelete(null);
    setShowInputUpdate(null);
  };
  const handleCloseItemSearchButton = () => {
    setItemSearchButton(!itemSearchButton);
    setItemSearchVal("");
  };

  //*******************************************************************RETURN********************************************************************** */
  return (
    <div style={lgScreen ? Style.mainContainerXL : Style.mainContainer}>
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
          {/* ---------------Floating Insert Categories-------------------------- */}
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
            <motion.button
              style={
                !submitButtonState
                  ? { ...Style.submit, backgroundColor: `${themeColor.color}` }
                  : { ...Style.submit, backgroundColor: `${themeColor.color}`,color:"#FFF7FC" }
              }
              whileHover={{
                scale: 1.01,
              }}
              onClick={handleSubmit}
            >
              {!submitButtonState ? "Submit" : "Wait..."}
            </motion.button>
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
                  onClick={handleItemCloseSearchButton}
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
        {catRes.length > 0 ? (
          <ul style={Style.categoryListContainer}>
            {catRes.length > 0 &&
              currentCategory?.map((res) => {
                return (
                  <motion.li
                    key={res.id}
                    style={Style.categoryList}
                    onHoverStart={() =>
                      smScreen ? "" : setShowEditIcon(res.id)
                    }
                    onHoverEnd={handleCategoryHoverEnd}
                  >
                    {showInputUpdate !== res.id ? (
                      <motion.p
                        style={
                          categoryHover !== res.id &&
                          getCategoryName?.categoryName !== res.category
                            ? Style.categoryResponse
                            : {
                                ...Style.categoryResponse,
                                color: `${themeColor.color}`,
                              }
                        }
                        onClick={() =>
                          setGetCategoryName({
                            categoryId: res.id,
                            categoryName: res.category,
                          })
                        }
                        onHoverStart={() => setCategoryHover(res.id)}
                        onHoverEnd={() => setCategoryHover(null)}
                      >
                        {res.category}
                      </motion.p>
                    ) : (
                      <input
                        style={{
                          ...Style.updateInputShow,
                          borderBottom: `2px solid ${themeColor.color}`,
                        }}
                        type="text"
                        name="updatecat"
                        id="updatecat"
                        defaultValue={res.category}
                        onChange={(e) => setOnUpadateChange(e.target.value)}
                      />
                    )}

                    {
                      (showEditIcon === res.id || smScreen) &&
                      deleteUpdateState !== res.id ? ( //------------------------------------------------------(1st Condition)
                        editIconState !== res.id ? ( //----------------------------------------------------------------------------------(2nd Condition)
                          <FaEdit
                            style={Style.editCategoryIcon}
                            onClick={() => handleSetEditIconState(res.id)}
                          />
                        ) : updateDelete !== res.id ? ( //------------------------------------------------------------------------------------(3nd Condition)
                          <AnimatePresence>
                            <motion.span
                              style={Style.showCategoryEditItem}
                              initial={
                                smScreen ? { opacity: 0 } : { right: "-2rem" }
                              }
                              animate={
                                smScreen ? { opacity: 1 } : { right: ".5rem" }
                              }
                              exit={
                                smScreen ? { opacity: 0 } : { right: "-2rem" }
                              }
                            >
                              <motion.span
                                style={Style.categoryEditPenIcon}
                                whileHover={{
                                  color: "#78A083",
                                }}
                                onClick={() => handleUpdateCat(res.id)}
                              >
                                <FaPen />
                              </motion.span>

                              <motion.span
                                style={Style.categoryDeleteIcon}
                                whileHover={{
                                  color: "#7D0A0A",
                                }}
                                onClick={() => handleDeleteCat(res.id)}
                              >
                                <FaTrash />
                              </motion.span>
                            </motion.span>
                          </AnimatePresence>
                        ) : confirmUpdateDelete === "delete" ? ( //---------------------------------------------------------------------------(4rd Condition)
                          <div style={Style.confirmUpdateDeleteContainer}>
                            <motion.span
                              whileHover={{
                                scale: 1.1,
                                color: "#7D0A0A",
                              }}
                              onClick={() =>
                                handleConfirmDeleteCategory({
                                  catId: res.id,
                                  userId: session?.user.id,
                                })
                              }
                              style={Style.confirmFaCheck}
                            >
                              <FaCheck />
                            </motion.span>

                            <motion.span
                              style={Style.confirmMdClose}
                              whileHover={{
                                scale: 1.1,
                                color: "#78A083",
                              }}
                              onClick={handleCancelDelete}
                            >
                              <AiOutlineCloseCircle />
                            </motion.span>
                          </div>
                        ) : (
                          <div style={Style.confirmUpdateDeleteContainer}>
                            <motion.span
                              whileHover={{
                                scale: 1.1,
                                color: "#7D0A0A",
                              }}
                              style={Style.confirmFaCheck}
                              onClick={() =>
                                handleNewCategoryName({
                                  catId: res.id,
                                  userId: session?.user.id,
                                  newCat: onUpdateChange,
                                })
                              }
                            >
                              <FaCheck />
                            </motion.span>

                            <motion.span
                              style={Style.confirmMdClose}
                              whileHover={{
                                scale: 1.1,
                                color: "#78A083",
                              }}
                              onClick={handleCancelUpdate}
                            >
                              <AiOutlineCloseCircle />
                            </motion.span>
                          </div>
                        )
                      ) : // -----------------------------NO SHOW-------------------------------------
                      deleteUpdateState === res.id ? (
                        <motion.span
                          animate={Motionimate.infiniteRotate}
                          style={Style.updateDeleteLoading}
                        >
                          <FcProcess style={Style.updateDeleteLoadingIcon} />
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={
                            smScreen ? { opacity: 0 } : { right: "-2rem" }
                          }
                          animate={
                            smScreen ? { opacity: 1 } : { right: ".5rem" }
                          }
                          exit={smScreen ? { opacity: 0 } : { right: "-2rem" }}
                        ></motion.span>
                      )
                      //--------------------SHOW----------------------------------
                    }
                  </motion.li>
                );
              })}
          </ul>
        ) : (
          <p style={Style.noCateogry}>Create Categories</p>
        )}

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick} //handlePage carries event and the styleCSS.css must be imported here (12)
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
      {/* ------------------------------Item Container Wrapper Starts Here------- */}
      <div style={lgScreen ? Style.itemContainerSm : Style.itemContainer}>
        <div
          style={
            !itemSearchButton
              ? {
                  ...Style.addItemContainer,
                  backgroundColor: `${themeColor.color}`,
                }
              : {
                  ...Style.addItemContainerSwitch,
                  backgroundColor: `${themeColor.color}`,
                }
          }
        >
          {/* ---------------Floating Drop Down Form form Items-------------------------- */}
          <div
            style={itemAddButton ? Style.addItemFormDown : Style.addItemFormUp}
          >
            <div style={Style.itemAddPhoto}>
              <div style={Style.itemUploadBanner}>
                <FaImage style={Style.itemPhotoImage} />
                <p>Photo :</p>
              </div>
              <CldUploadWidget
                uploadPreset="h9awltal"
                onSuccess={(result, { widget }) => {
                  setImageUpload(result.info.public_id);
                  widget.close();
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      className="p-2 bg-slate-400 rounded-sm"
                      onClick={() => open()}
                    >
                      Add here
                    </button>
                  );
                }}
              </CldUploadWidget>

              {imageUpload ? (
                <CldImage
                  style={Style.imageUploadedIcon}
                  width="40"
                  height="40"
                  src={imageUpload}
                  sizes="100vw"
                  alt="Img"
                  crop="thumb"
                />
              ) : (
                ""
              )}
            </div>
            <form
              style={Style.itemForm}
              id="itemForm"
              onSubmit={handleItemSubmit}
            >
              <input
                type="hidden"
                name="photo"
                id="photo"
                value={imageUpload}
              />

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="subcategory">
                  Subcategory
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  placeholder="Concrete nail..."
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="itemName">
                  Item name *
                </label>
                <input
                  style={itemError?.itemNameInput !== ""?{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }:{
                    ...Style.itemInput,
                    border:"2px solid #E72929",
                  }}
                  type="text"
                  id="itemName"
                  name="itemName"
                  placeholder="Nail #2..."
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="description">
                  Description
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Solid type Class B..."
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="brand">
                  Brand
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="China..."
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="supplier">
                  Supplier
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="supplier"
                  name="supplier"
                  placeholder="North korea..."
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="stock">
                  Stock
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="stock"
                  name="stock"
                  placeholder="100"
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="unit">
                  Unit
                </label>
                <select
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  name="unit"
                  id="unit"
                >
                  {unitList?.map((unit, key) => (
                    <option key={key} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="salePrice">
                  Sale price *
                </label>
                <input
                  style={itemError?.salePriceInput !== ""?{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }:{
                    ...Style.itemInput,
                    border:"2px solid #E72929",
                  }}
                  type="text"
                  id="salePrice"
                  name="salePrice"
                  placeholder="80"
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="netPrice">
                  Net price *
                </label>
                <input
                  style={itemError?.netPriceInput !== ""?{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }:{
                    ...Style.itemInput,
                    border:"2px solid #E72929",
                  }}
                  type="text"
                  id="netPrice"
                  name="netPrice"
                  placeholder="55"
                />
              </div>

              <div style={Style.itemInputContainer}>
                <label style={Style.itemFormlabel} htmlFor="vat">
                  VAT%
                </label>
                <input
                  style={{
                    ...Style.itemInput,
                    border: `2px solid ${themeColor.color}`,
                  }}
                  type="text"
                  id="vat"
                  name="vat"
                  placeholder="12"
                />
              </div>

              <input
                type="hidden"
                id="categoryId"
                name="categoryId"
                defaultValue={getCategoryName?.categoryId}
              />

              <motion.button
                type="submit"
                style={
                  !submitItemButtonState
                    ? {
                        ...Style.addItemSubmitButton,
                        backgroundColor: `${themeColor.color}`,
                      }
                    : {
                      ...Style.addItemSubmitButton,
                      backgroundColor: `${themeColor.color}`,
                      color:"#FFF7FC"
                    }
                }
                whileHover={{
                  scale: 1.01,
                }}
              >
                {!submitItemButtonState ? "Submit" : "Wait..."}
              </motion.button>
            </form>
          </div>
          {/* -----Item Icon here--- */}
          <TiThList style={Style.categoryIcon} />
          {/* -----Conditional Ternary Template for Items and Search-- */}
          <AnimatePresence>
            <p style={Style.itemIconBanner}>{xxlScreen ? "" : "Items :"}</p>
            {!itemSearchButton ? (
              <motion.p
                style={Style.itemLabel}
                key="modal"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {getCategoryName
                  ? getCategoryName.categoryName
                  : "Select Category"}
              </motion.p>
            ) : (
              <motion.label
                htmlFor="searchitem"
                style={Style.label}
                key="modal"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <input
                  type="text"
                  name="searchitem"
                  id="searchitem"
                  placeholder="Search Items..."
                  style={{ ...Style.input }}
                  value={searchItemVal}
                  onChange={handleItemSearchVal}
                />
                <MdClose
                  style={Style.mdClose}
                  onClick={handleCloseItemSearchButton}
                />
              </motion.label>
            )}
          </AnimatePresence>
          {/*------Show and Hide Search Button--- */}
          {!itemSearchButton ? (
            <motion.span
              style={Style.searchIcon}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => setItemSearchButton(!itemSearchButton)}
            >
              <FaSearch />
            </motion.span>
          ) : (
            ""
          )}
          {/* ----Show and Hide Add Button------ */}
          {getCategoryName ? (
            !itemAddButton ? (
              <motion.span
                style={Style.addIcon}
                whileHover={{
                  scale: 1.1,
                }}
                onClick={() => setItemAddButton(!itemAddButton)}
              >
                <FaPlus />
              </motion.span>
            ) : (
              <motion.span
                style={Style.addIcon}
                whileHover={{
                  scale: 1.1,
                }}
                onClick={() => setItemAddButton(!itemAddButton)}
              >
                <MdClose style={Style.plusClose} />
              </motion.span>
            )
          ) : (
            ""
          )}
        </div>
        {/* --------UL Content, List of Items--- */}
        {getCategoryName && showCreatedItems.length > 0? (
          <ul style={Style.itemListContainer}>
            {showCreatedItems.length > 0 &&
              currentItem?.map((res) => {
                return (
                  <motion.li
                    key={res.id}
                    style={Style.categoryList}
                    onHoverStart={() =>
                      smScreen ? "" : setShowEditIcon(res.id)
                    }
                    onHoverEnd={handleCategoryHoverEnd}
                  >
                    {showInputUpdate !== res.id ? (
                      <p style={Style.categoryResponse}>{res.itemName}</p>
                    ) : (
                      <input
                        style={{
                          ...Style.updateInputShow,
                          borderBottom: `2px solid ${themeColor.color}`,
                        }}
                        type="text"
                        name="updateitem"
                        id="updateitem"
                        defaultValue={res.itemName}
                        onChange={(e) => setOnUpadateChange(e.target.value)}
                      />
                    )}

                    {
                      (showEditIcon === res.id || smScreen) &&
                      deleteUpdateState !== res.id ? ( //------------------------------------------------------(1st Condition)
                        editIconState !== res.id ? ( //----------------------------------------------------------------------------------(2nd Condition)
                          <FaEdit
                            style={Style.editCategoryIcon}
                            onClick={() => handleSetEditIconState(res.id)}
                          />
                        ) : updateDelete !== res.id ? ( //------------------------------------------------------------------------------------(3nd Condition)
                          <AnimatePresence>
                            <motion.span
                              style={Style.showCategoryEditItem}
                              initial={
                                smScreen ? { opacity: 0 } : { right: "-2rem" }
                              }
                              animate={
                                smScreen ? { opacity: 1 } : { right: ".5rem" }
                              }
                              exit={
                                smScreen ? { opacity: 0 } : { right: "-2rem" }
                              }
                            >
                              <motion.span
                                style={Style.categoryEditPenIcon}
                                whileHover={{
                                  color: "#78A083",
                                }}
                                onClick={() => handleUpdateCat(res.id)}
                              >
                                <FaPen />
                              </motion.span>

                              <motion.span
                                style={Style.categoryDeleteIcon}
                                whileHover={{
                                  color: "#7D0A0A",
                                }}
                                onClick={() => handleDeleteCat(res.id)}
                              >
                                <FaTrash />
                              </motion.span>
                            </motion.span>
                          </AnimatePresence>
                        ) : confirmUpdateDelete === "delete" ? ( //---------------------------------------------------------------------------(4rd Condition)
                          <div style={Style.confirmUpdateDeleteContainer}>
                            <motion.span
                              whileHover={{
                                scale: 1.1,
                                color: "#7D0A0A",
                              }}
                              onClick={() =>
                                handleConfirmDeleteCategory({
                                  catId: res.id,
                                  userId: session?.user.id,
                                })
                              }
                              style={Style.confirmFaCheck}
                            >
                              <FaCheck />
                            </motion.span>

                            <motion.span
                              style={Style.confirmMdClose}
                              whileHover={{
                                scale: 1.1,
                                color: "#78A083",
                              }}
                              onClick={handleCancelDelete}
                            >
                              <AiOutlineCloseCircle />
                            </motion.span>
                          </div>
                        ) : (
                          <div style={Style.confirmUpdateDeleteContainer}>
                            <motion.span
                              whileHover={{
                                scale: 1.1,
                                color: "#7D0A0A",
                              }}
                              style={Style.confirmFaCheck}
                              onClick={() =>
                                handleNewCategoryName({
                                  catId: res.id,
                                  userId: session?.user.id,
                                  newCat: onUpdateChange,
                                })
                              }
                            >
                              <FaCheck />
                            </motion.span>

                            <motion.span
                              style={Style.confirmMdClose}
                              whileHover={{
                                scale: 1.1,
                                color: "#78A083",
                              }}
                              onClick={handleCancelUpdate}
                            >
                              <AiOutlineCloseCircle />
                            </motion.span>
                          </div>
                        )
                      ) : // -----------------------------NO SHOW-------------------------------------
                      deleteUpdateState === res.id ? (
                        <motion.span
                          animate={Motionimate.infiniteRotate}
                          style={Style.updateDeleteLoading}
                        >
                          <FcProcess style={Style.updateDeleteLoadingIcon} />
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={
                            smScreen ? { opacity: 0 } : { right: "-2rem" }
                          }
                          animate={
                            smScreen ? { opacity: 1 } : { right: ".5rem" }
                          }
                          exit={smScreen ? { opacity: 0 } : { right: "-2rem" }}
                        ></motion.span>
                      )
                      //--------------------SHOW----------------------------------
                    }
                  </motion.li>
                );
              })}
          </ul>
        ) : (
          <p style={Style.noItem}>No Items</p>
        )}
        {/*---Pagination---  */}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handleItemPageClick} //handlePage carries event and the styleCSS.css must be imported here (12)
          pageRangeDisplayed={3}
          pageCount={itemPageCount}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
          forcePage={selectedItem}
        />
      </div>

      <div>Item Detials</div>
    </div>
  );
}

export default Manage;
