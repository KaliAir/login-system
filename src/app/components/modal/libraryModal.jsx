"use client";
import React, { useEffect } from "react";
import { Style } from "./styleJS";
import useCreateObj from "@/zustand/tempValue/temporaryVal";
import { CldImage } from "next-cloudinary";
import useThemeColors from "@/zustand/theme/themeColor";
import { CgClose } from "react-icons/cg";
import Skeleton,{ SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Spinner from "../loading/spinner";

function LibraryModal() {
  const [photoList, setPhotoList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { themeColor } = useThemeColors((state) => ({
    themeColor: state.themeColor,
  }));
  const { setItemLibraryState, catRes, getCategoryName, showLibraryPhotos } =
    useCreateObj((state) => ({
      setItemLibraryState: state.setItemLibraryState,
      catRes: state.catRes,
      getCategoryName: state.getCategoryName,
      showLibraryPhotos: state.showLibraryPhotos,
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
      }
      setLoading(false);
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
      {loading ? (
        <div style={Style.skeletonWrapper}>
          <Spinner/>
        </div>
       
      ) : (
        <ul style={Style.imageListContainer}>
          {photoList
            ?.filter((filterItem) =>
              selectValue ? filterItem.categoryId === selectValue : false
            )
            .map((items) => {
              return (
                <li key={items.id} style={Style.libraryLi}>
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
