export const Style = {
    mainContainer:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        gridColumnGap:"2rem",
        borderRadius:".5rem",
        position:"relative",
        zIndex:"-4"
    },
    categoryContainer:{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        margin:"0rem .5rem .5rem .5rem",
        borderRadius:"0rem 0rem .5rem .5rem",
        position:"relative",
        zIndex:"-3"
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
        position:"absolute",
        width:"100%",
        top:"3.1rem",
        backgroundColor:"white",
        height:"28rem",
        zIndex:"-1",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease"
    },
    addCategoryFormUp:{
        position:"absolute",
        width:"100%",
        top:"-20dvh",
        backgroundColor:"white",
        height:"10rem",
        zIndex:"-1",
        borderRadius:".7rem",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transition:"top .5s ease"
    },
    addCategoryContainerSwitch:{
        display:"grid",
        gridTemplateColumns:"auto 1fr 2rem",
        padding:".5rem 1rem",
        borderRadius:".3rem 0rem 1.3rem 0rem",
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
    },
    mdClose:{
        placeSelf:"center",
        fontWeight:"700",
        fontSize:"1.35rem",
        cursor:"pointer",
        backgroundColor:"white",
        height:"100%",
        borderRadius:"0rem .3rem .3rem 0rem",
    },
    categoryIcon:{
        fontSize:"1.7rem",
        placeSelf:"center",
        marginRight:".5rem",
    },
    label:{
        display:"grid",
        gridTemplateColumns:"1fr auto",

    }
}