export const Style  = {
    formWrapper: {
        display: "grid",
        placeContent: "center",
        backgroundColor: "#4158D0",
        backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        height: "100dvh",
        position: "relative",
        width:"100%",

    },
    form:{
        display: "grid",
        placeContent: "center",
        // gridTemplateRows: ".5fr 1.5fr 1fr 1fr .5fr .5fr .5fr 1fr",
        backgroundColor: "white",
        padding: "20px 30px",
        gridRowGap: "20px",
        borderRadius: "15px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        position: "relative",
        zIndex: "30",
        border:"2px solid rgb(0,0,0,.2)"
    
    },
    login:{
        placeSelf: "center",
        fontWeight: "600",
        color: "rgb(0,0,0,.8)",
        padding: "5px 4rem",
        borderRadius: "10px"
    },
    label:{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridColumnGap: "10px",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        padding: "0px 5px",
        borderRadius: "5px",
    },
    input:{
        height: "3rem",
        outline: "none",
        borderRadius: "5px",
        color: "rgb(0,0,0,.8)",
        fontWeight: "600",
    },
    emailIcon:{
        placeSelf:"center",
        fontSize: "1.1rem",
        color: "rgb(0,0,0,.7)",
    },
    passwordIcon:{
        placeSelf:"center",
        fontSize: "1.4rem",
        color: "rgb(0,0,0,.7)",
    },
    signFor:{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontSize: ".9rem",
        fontWeight: "700",
    },
    signUpForget:{
        color: "rgb(0,0,0,.9)"
    },
    button:{
        backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        borderRadius: "5px",
        color: "white",
        fontWeight: "600",
        padding:"10px 0px",
        width: "6rem",
        placeSelf: "center",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        fontSize:"1.1rem",
        letterSpacing: "2px",
    },
    buttonLoad:{
        backgroundColor: "#4158D0",
        borderRadius: "5px",
        color: "white",
        fontWeight: "600",
        padding:"10px 0px",
        width: "6rem",
        placeSelf: "center",
        color:"black",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        fontSize:"1.1rem",
        letterSpacing: "2px",
    },
    or:{
        placeSelf: "center",
        fontSize: ".9rem",
        fontWeight: "600",
        color: "rgb(0,0,0,.8)"
    },
    signInWith:{
        display: "grid",
        placeItems: "center",
        gridTemplateColumns: "repeat(3,auto)",
        fontSize: "2.5rem"
    },
    fbIcon:{
        color: "#1B3C73",
        cursor:"pointer"
    },
    twitterIcon:{
        color: "#6895D2",
        cursor:"pointer"
    },
    googleIcon: {
        color: "#D04848",
        cursor: "pointer",

    },
    goBack:{
        alignSelf: "center",
        justifySelf: "center",
        fontSize: "2.2rem",
        color: "#78A083",
        borderBottom: "solid 3px rgb(0,0,0,.5)",
    },
    error:{
        color:"#EE4266",
        fontWeight:"600",
        fontSize: ".9rem",
        textAlign:"center",
    }
    
}