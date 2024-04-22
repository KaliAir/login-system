export const Style = {
    libraryModal:{
        display:"grid",
        gridTemplateRows:"auto auto 1fr",
        gridRowGap:"1rem",
        position:"relative",
        background:"#F0EBE3",
        opacity:"1",
        height:"35rem",
        // width:"35rem",
        padding:"1rem",
        borderRadius:".3rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        
    },
    imageListContainer:{
        display:"grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridAutoColumn:"25%",
        overflowY:"scroll",
        gridGap:".5rem"
    },
    skeletonWrapper:{
        display:"grid",
        placeContent:"center",
        height:"20rem",
        width:"20rem",
    },
    librarySelect:{
        fontWeight:"2rem",
        padding:".5rem",
        outline:"none",
        borderRadius:".3rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    closeLibraryModal:{
        fontWeight:"600",
        fontSize:"1.5rem",
        border:"2px solid rgb(0,0,0,.7)",
        borderRadius:"50%",
        padding:".2rem",
        cursor:"pointer",
    },
    libraryTitleContainer:{
        display:"grid",
        gridTemplateColumns:"1fr auto",
        placeItems:"center",
    },
    libWord:{
        fontSize:"1.3rem",
        letterSpacing:".1rem",
        fontWeight:"600",
        color:"rgb(0,0,0,.6)",
    },
    libraryImage:{
        borderRadius:".2rem",
        border:"1px solid rgb(0,0,0,.3)",
        cursor:"pointer",
        width:"100%",
        height:"100%",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },
    libraryLi:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    noImage:{
        justifySelf:"center",
    }
}