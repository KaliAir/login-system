export const Style = {
   
    // Main Container of Admin Layout <main></main>
    main:{
        height:"81.3dvh",
        position:"relative",
        backgroudColor:"white",
        zIndex:"-12",
    },
    // Section the content of the app <section></section>
    section:{
        height:"100%",
        position:"relative",
        zIndex:"-13",
    },
    // Note this is the back of the Aside Element that have to columns(aside nav is not including to this layout) 
    contentWrapper:{
        display:"grid",
        position:"relative",
        gridTemplateColumns:"12rem 1fr",
        overflow:"hidden",
        zIndex:"-15",
        transition:"grid-template-columns 0.7s ease"
    },
    contentWrapperColapse:{
        display:"grid",
        position:"relative",
        gridTemplateColumns:"1fr",
        overflow:"hidden",
        zIndex:"-15",
        transition:"grid-template-columns 0.7s ease"
    },  
    span:{
        position:"relative",
        zIndex:"-11",
    },
}