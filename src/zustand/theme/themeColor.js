import { create } from "zustand";

const themeColors = (set)=>({
    hoverColor : {},
    setHoverColor: (theme)=>{
        set((state)=>({
            hoverColor: theme
        }))
    },
    themeColor:{name:"Light Orange",color:"#ECB159"},
    setThemeColor:(theme)=>{
        set((state)=>({
            themeColor: theme
        }))
    },
})

const useThemeColors = create(themeColors)
export default useThemeColors