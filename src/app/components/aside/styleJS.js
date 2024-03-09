export const Style = {
    container:{
        backgroundColor:"#FBF9F1",
        boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.5)",
        position:"absolute",
        top:".5rem",
        left:"0px",
        width:"12rem",
        height:"100%",
        borderRadius:"0px 10px 10px 0px",
        // zIndex:"-9"
    },
    containerColapse:{
        backgroundColor:"#FBF9F1",
        boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.5)",
        position:"absolute",
        top:".5rem",
        left:"-12rem",
        width:"12rem",
        height:"100%",
        transition: "left 0.7s ease",
        borderRadius:"0px 10px 10px 0px",
        // zIndex:"-9"
    },
    buttonColapse:{
        display:"grid",
        // backgroundColor:"#78A083",
        position:"absolute",
        width:"5rem",
        height:"3.7rem",
        borderRadius:"3rem",
        right:"-45px",
        bottom:"50%",
        cursor:"pointer",
        boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.5)",
        zIndex:"-1"
    },
    buttonGear:{
        width:"100%",
        height:"100%"
    },
    gearContainer:{
        width:"3rem",
        height:"3rem",
        justifySelf:"end",
        alignSelf:"center",
        marginRight:".3rem",
        borderRadius:"50%",
    },
    sidebarLogo:{
        width:"auto",
        height:"auto",
    },
    adminLogoinfo:{
        display:"grid",
        gridRowGap:"1.5rem",
        placeItems:"center",
        marginTop:"1rem"
    },
    asideNavigationContainer:{
        display:"grid",
    },
    span:{
        width:"100%"
    }
}