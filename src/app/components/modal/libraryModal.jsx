"use client";
import React, { useEffect } from "react";
import { Style } from "./styleJS";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { CldImage } from "next-cloudinary";
import useThemeColors from "@/zustand/theme/themeColor";
import { CgClose } from "react-icons/cg";
import Spinner from "../loading/spinner";

function LibraryModal() {
  const [photoList, setPhotoList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { themeColor } = useThemeColors((state) => ({
    themeColor: state.themeColor,
  }));
  const { setItemLibraryState, catRes, getCategoryName, showLibraryPhotos,setImageUpload } =
    useCreateObj((state) => ({
      setItemLibraryState: state.setItemLibraryState,
      catRes: state.catRes,
      getCategoryName: state.getCategoryName,
      showLibraryPhotos: state.showLibraryPhotos,
      setImageUpload: state.setImageUpload
    }));

  const [selectValue, setSelectValue] = React.useState(
    getCategoryName.categoryId
  );

  useEffect(() => {
    const handleSelectRefetch = async () => {
      setLoading(true);
      const photoResponse = await showLibraryPhotos(selectValue);
      if (photoResponse.success) {
        setPhotoList(photoResponse.checkId);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    handleSelectRefetch();
  }, [selectValue]);

  const handleUpload = (photo)=>{
    setImageUpload(photo)
    setItemLibraryState(false)
  }

  return (
    //--Div Container
    <div style={Style.libraryModal}>
      {/* Div Child 1 */}
      <div style={Style.libraryTitleContainer}>
        <p style={Style.libWord}>Select image</p>
        <CgClose
          style={Style.closeLibraryModal}
          onClick={() => setItemLibraryState(false)}
        />
      </div>
      {/* Select Child 2 */}
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        style={{
          ...Style.librarySelect,
          border: `2px solid ${themeColor.color}`,
        }}
        id="selectCatPhoto"
        name="selectCatPhoto"
      >
        {catRes?.map((res) => {
          return (
            <option value={res.id} key={res.id}>
              {res.category}
            </option>
          );
        })}
      </select>
      {/* ShowHide Child 3 */}
      {loading ? (
        <div style={Style.skeletonWrapper}>
          <Spinner />
        </div>
      ) : (
        <ul style={Style.imageListContainer}>
          {photoList?.map((items) => {
            return (
              <li key={items.id} style={Style.libraryLi}
              onClick={()=>handleUpload(items.photo)}
              >
                {items.photo ? (
                  <CldImage
                    width="150"
                    height="150"
                    src={items.photo}
                    sizes="100vw"
                    alt="Item Image"
                    style={Style.libraryImage}
                  />
                ) : (
                  <span style={Style.noImage}>No image</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LibraryModal;
