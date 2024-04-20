export const Style = {
    mainContainer:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        gridColumnGap:"2rem",
        borderRadius:".5rem",
        position:"relative",
        zIndex:"-10",
    },
    mainContainerXL:{
        display:"grid",
        gridColumnGap:"2rem",
        borderRadius:".5rem",
        position:"relative",
        zIndex:"-10",
    },
    categoryContainer:{
        display:"grid",
        gridTemplateRows:"auto 1fr auto",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        margin:"0rem .5rem .5rem .5rem",
        borderRadius:"0rem 0rem .5rem .5rem",
        position:"relative",
        zIndex:"-4",
    },
    addCategoryContainer:{
        display:"grid",
        gridTemplateColumns:"auto 1fr 2rem 2rem",
        padding:".5rem 1rem",
        borderRadius:"0rem 0rem 1.3rem 0rem",
        fontSize:"1.1rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        height:"3rem",
        position:"relative", 
    },
    addCategoryFormDown:{
        display:"grid",
        gridTemplateRows:"auto 1fr auto",
        position:"absolute",
        width:"100%",
        top:"3.1rem",
        backgroundColor:"white",
        // height:"28rem",
        zIndex:"-1",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease"
    },
    addCategoryFormUp:{
        // display:"grid",
        // gridTemplateRows:"auto 1fr auto",
        position:"absolute",
        width:"100%",
        top:"-60dvh",
        backgroundColor:"white",
        // height:"10rem",
        zIndex:"-1",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease",
        display:"none"
    },
    addCategoryContainerSwitch:{
        display:"grid",
        gridTemplateColumns:"auto 1fr 2rem",
        padding:".5rem 1rem",
        borderRadius:"0rem 0rem 1.3rem 0rem",
        fontSize:"1.1rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        height:"3rem",
        position:"relative",    
    },
    categoryLabel:{
        fontSize:"1.2rem",
        fontWeight:"700",
        color:"rgb(0,0,0,.6)",
        placeSelf:"center",
    },
    categoryListContainer:{
        position:"relative",
        padding:".5rem 1rem",
        zIndex:"-2",
        overflowX:"hidden",
    },
    searchIcon:{
        padding:"0rem 0rem",
        placeSelf:"center",
        cursor:"pointer",
    },
    addIcon:{
        padding:"0rem 0rem",
        placeSelf:"center",
        cursor:"pointer",
    },
    input:{
        padding:".2rem .5rem",
        fontSize:"1rem",
        fontWeight:"700",
        letterSpacing:"1px",
        outline:"none",
        borderRadius:".3rem 0rem 0rem .3rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        width:"100%",
    },
    mdClose:{
        placeSelf:"center",
        fontWeight:"700",
        fontSize:"1.35rem",
        cursor:"pointer",
        backgroundColor:"white",
        height:"100%",
        borderRadius:"0rem .3rem .3rem 0rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    categoryIcon:{
        fontSize:"1.7rem",
        placeSelf:"center",
        marginRight:".5rem",
    },
    label:{
        display:"grid",
        gridTemplateColumns:"1fr auto",

    },
    plusClose:{
        placeSelf:"center",
        fontWeight:"700",
        fontSize:"1.4rem",
        cursor:"pointer",
        backgroundColor:"white",
        borderRadius:"50%",
        placeSelf:"center",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    insertCat:{
        display:"grid",
        gridTemplateColumns:"1fr auto",
        margin:".5rem",
        padding:".5rem",
        borderRadius:".5rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

    },
    insertInput:{
        outline:"none",
        letterSpacing:".07rem",
        fontWeight:"600",
        width:"100%"
    },
    insertButton:{
        fontSize:"1.6rem",
        cursor:"pointer",
    },
    inertCatList:{
        display:"grid",
        margin:".5rem",
    },
    ulItems:{
        display:"grid",
        gridTemplateColumns:"1fr 1.5rem",
        padding:".4rem",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        fontWeight:"700",
        color:"rgb(0,0,0,.6)",
    },
    listTrashIcon:{
        cursor:"pointer",
    },
    submit:{
        placeSelf:"center",
        fontSize:"1.2rem",
        fontWeight:"600",
        padding:".3rem 0rem",
        width:"100%",
        borderRadius:"0rem 0rem .5rem .5rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    categoryList:{
        display:"grid",
        gridTemplateColumns:"1fr auto",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        fontWeight:"700",
        color:"rgb(0,0,0,.6)",
        padding:".4rem",
        position:"relative",
    },
    editCategoryIcon:{
        cursor:"pointer"
    },
    showCategoryEditItem:{
        display:"flex",
        gridColumnGap:"1rem",
        position:"absolute",
        right:".5rem",
        top:".5rem",
        placeItems:"center",
    },
    categoryEditPenIcon:{
        cursor:"pointer"
    },
    categoryDeleteIcon:{
        cursor:"pointer"
    },
    categoryResponse:{
        cursor:"pointer",
    },
    confirmUpdateDeleteContainer:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gridColumnGap:"1rem",
        placeItems:"center",
    },
    confirmMdClose:{
        cursor:"pointer",
    },
    confirmFaCheck:{
        cursor:"pointer",
    },
    updateDeleteLoading:{
        display:"grid",
    },
    updateDeleteLoadingIcon:{
        placeSelf:"center"
    },
    updateInputShow:{
        outline:"none",
        width:"100%",
    },
    noCateogry:{
        display:"grid",
        justifyContent:"center",
        alignContent:"center",
    },
    noItem:{
        display:"grid",
        justifyContent:"center",
        alignContent:"center",
        position:"relative",
        zIndex:"-7"
    },
    // Item Starts here----------------------------
    itemContainer:{
        display:"grid",
        gridTemplateRows:"auto 1fr auto",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        margin:"0rem .5rem .5rem .5rem",
        borderRadius:"0rem 0rem .5rem .5rem",
        position:"relative",
        zIndex:"-9",
    },
    itemContainerSm:{
        display:"grid",
        gridTemplateRows:"auto 1fr auto",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        margin:"0rem .5rem .5rem .5rem",
        borderRadius:"0rem 0rem .5rem .5rem",
        position:"relative",
        zIndex:"-9",
        // overflowY:"scroll"
    },
    addItemContainer:{
        display:"grid",
        gridTemplateColumns:"auto auto 1fr 2rem 2rem",
        padding:".5rem 1rem",
        borderRadius:"0rem 0rem 1.3rem 0rem",
        fontSize:"1.1rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        height:"3rem",
        position:"relative",
        
    },
    addItemContainerSwitch:{
        display:"grid",
        gridTemplateColumns:"auto auto  1fr 2rem",
        padding:".5rem 1rem",
        borderRadius:"0rem 0rem 1.3rem 0rem",
        fontSize:"1.1rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        height:"3rem",
        position:"relative",
          
    },
    itemIconBanner:{
        placeSelf:"center",
        fontSize:"1.1rem",
        fontWeight:"700",
    },
    addItemFormDown:{
        display:"grid",
        gridTemplateRows:"4rem 1fr",
        position:"absolute",
        width:"100%",
        top:"3.1rem",
        backgroundColor:"white",
        // height:"28rem",
        zIndex:"-6",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease",
    },
    addItemFormUp:{
        // display:"grid",
        // gridTemplateRows:"1fr 1fr auto",
        position:"absolute",
        width:"100%",
        top:"-60dvh",
        backgroundColor:"white",
        // height:"10rem",
        zIndex:"-6",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease",
        display:"none"
    },
    itemListContainer:{
        position:"relative",
        padding:".5rem 1rem",
        zIndex:"-7",
        overflowX:"hidden",
    },
    itemLabel:{
        fontSize:"1.2rem",
        fontWeight:"700",
        color:"rgb(0,0,0,.6)",
        placeSelf:"center",
        whiteSpace:"nowrap",
    },
    
    itemInputContainer:{
        display:"grid",
        gridTemplateRows:"repeat(2,1.5rem)",
        placeItems:"center",
        position:"relative",
        padding:"0rem .5rem",
    },
    itemFormlabel:{
        position:"absolute",
        fontSize:".9rem",
        top:"-15px",
        left:"30px",
        backgroundColor:"white",
        fontWeight:"600"
    },
    itemInput:{
        borderRadius:".3rem",
        padding:".3rem",
        fontSize:"1.1rem",
        outline:"none",
        width:"100%",
    },
    itemSubmit:{
        placeSelf:"center",
        fontSize:"1.2rem",
        fontWeight:"600",
        padding:".3rem 1rem",
        margin:".4rem 0rem",
        borderRadius:".3rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    addItemSubmitButton:{
        width:"100%",
        borderRadius:"0rem 0rem .5rem .5rem",
        padding:".5rem 0rem",
        fontWeight:"600"
    },
    itemAddPhoto:{
        display:"grid",
        placeItems:"center",
        gridTemplateColumns:"1fr 1fr 5rem",
    },
    itemUploadBanner:{
        display:"flex",
        gridColumnGap:".5rem",
    },
    itemPhotoImage:{
        fontSize:"1.3rem",
    },
    imageUploadedIcon:{
        borderRadius:".3rem"
    }
}