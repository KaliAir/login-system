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
        transition: "left 0.5s ease"
    },
    containerColapse:{
        backgroundColor:"#FBF9F1",
        boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.5)",
        position:"absolute",
        top:".5rem",
        left:"-12rem",
        width:"12rem",
        height:"100%",
        transition: "left 0.5s ease",
        borderRadius:"0px 10px 10px 0px",

    },
    buttonColapse:{
        display:"grid",
        // backgroundColor:"#78A083",
        position:"absolute",
        width:"5rem",
        height:"3.7rem",
        borderRadius:"3rem",
        right:"-35px",
        bottom:"50%",
        cursor:"pointer",
        boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.5)",
        zIndex:"-1"
    },
    buttonColapseSmall:{
        display:"grid",
        // backgroundColor:"#78A083",
        position:"absolute",
        width:"5rem",
        height:"3.2rem",
        borderRadius:"3rem",
        right:"-30px",
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
    gearContainerSmall:{
        width:"2rem",
        height:"2rem",
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
        gridTemplateRows:"auto 1fr"
    },
    span:{
        width:"100%"
    },
    asideNavItems:{
        display:"grid"
    },
    sideNavItems:{
        padding:".8rem 0px .8rem .5rem",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        borderRadius:"0px 0px 1.5rem 0px",
        fontWeight:"600",
    },
}