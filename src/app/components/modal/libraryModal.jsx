"use client";
import React, { useEffect } from "react";
import { Style } from "./styleJS";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { CldImage } from "next-cloudinary";
import useThemeColors from "@/zustand/theme/themeColor";
import { CgClose } from "react-icons/cg";
import Spinner from "../loading/spinner";

function LibraryModal() {

  const [loading, setLoading] = React.useState(false);
  const { themeColor } = useThemeColors((state) => ({
    themeColor: state.themeColor,
  }));
  const { setItemLibraryState, catRes, getCategoryName, showLibraryPhotos,photoList } =
    useCreateObj((state) => ({
      setItemLibraryState: state.setItemLibraryState,
      catRes: state.catRes,
      getCategoryName: state.getCategoryName,
      showLibraryPhotos: state.showLibraryPhotos,
      photoList: state.photoList
    }));

  const [selectValue, setSelectValue] = React.useState(
    getCategoryName.categoryId
  );

  useEffect(() => {
    const handleSelectRefetch = async () => {
      
      const photoResponse = await showLibraryPhotos(selectValue);
     
    };
    handleSelectRefetch();
  }, [selectValue]);

  return (
    <div style={Style.libraryModal}>
      <div style={Style.libraryTitleContainer}>
        <p style={Style.libWord}>Select image</p>
        <CgClose
          style={Style.closeLibraryModal}
          onClick={() => setItemLibraryState(false)}
        />
      </div>
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        style={{
          ...Style.librarySelect,
          border: `2px solid ${themeColor.color}`,
        }}
      >
        <option value={getCategoryName.categoryId}>
          {getCategoryName ? getCategoryName.categoryName : ""}
        </option>
        {catRes
          ?.filter((cat) => cat.id !== getCategoryName.categoryId)
          .map((res) => {
            return (
              <option value={res.id} key={res.id}>
                {res.category}
              </option>
            );
          })}
      </select>
     
        <ul style={Style.imageListContainer}>
          {photoList?.map((items) => {
              return (
                <li key={items.id} style={Style.libraryLi}>
                  
                    <CldImage
                      width="150"
                      height="150"
                      src={items.photo}
                      sizes="100vw"
                      alt="Item Image"
                      style={Style.libraryImage}
                    />
                  
                </li>
              );
            })}
        </ul>
      
    </div>
  );
}

export default LibraryModal;
