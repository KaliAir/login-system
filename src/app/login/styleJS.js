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
        backgroundColor: "white",
        padding: "1rem 1rem",
        gridRowGap: ".7rem",
        borderRadius: "15px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        position: "relative",
        zIndex: "30",
        border:"2px solid rgb(0,0,0,.2)",
        width:"20rem"
    
    },
    login:{
        placeSelf: "center",
        fontWeight: "600",
        color: "rgb(0,0,0,.8)",
    },
    label:{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridColumnGap: "10px",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        padding: "0px 5px",
        borderRadius: "5px",
    },
    labelPassword:{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridColumnGap: "10px",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        padding: "0px 5px",
        borderRadius: "5px",
    },
    labelEye:{
        placeSelf:"center",
        fontSize:"1.2rem",
        cursor:"pointer",
        color:"rgb(0,0,0,.8)"
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
        color: "rgb(0,0,0,.7)",
        justifySelf:"end",
        textShadow: "-2px 3px 2px rgba(0, 0, 0, .2)"
    },
    signUpSign:{
        color: "rgb(0,0,0,.7)",
        textShadow: "-2px 3px 2px rgba(0, 0, 0, .2)"
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
        color: "rgb(0,0,0,.8)",
        borderBottom:"4px solid rgb(0,0,0,.4)",
        borderRadius:"50%",
        paddingBottom:".7rem"
    },
    signInWith:{
        display: "grid",
        placeItems: "center",
        gridTemplateColumns: "repeat(3,auto)",
        fontSize: "2.5rem"
    },
    fbIcon:{
        color: "#1B3C73",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        borderRadius:"50%",
        cursor:"pointer"
    },
    twitterIcon:{
        color: "#6895D2",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        borderRadius:"50%",
        cursor:"pointer"
    },
    googleIcon: {
        color: "#D04848",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        borderRadius:"50%",
        cursor:"pointer"
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