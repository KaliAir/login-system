import { create } from "zustand";


const booleanState = (set)=>({
    asideButtonColapseState: false,
    asideButtonColapseCall:(finalState)=>{
        set((state)=>({
            asideButtonColapseState: finalState
        }))
    },
});

const useBooleanState = create(booleanState);
export default useBooleanState