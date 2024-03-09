import { create } from "zustand";

const themeColors = (set)=>({
    hoverColor : {},
    setHoverColor: (theme)=>{
        set((state)=>({
            hoverColor: theme
        }))
    },
    themeColor:{name:"Toledo Gold",color:"#EABE6C"},
    setThemeColor:(theme)=>{
        set((state)=>({
            themeColor: theme
        }))
    }
})

const useThemeColors = create(themeColors)
export default useThemeColors