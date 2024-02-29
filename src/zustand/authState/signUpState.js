import { create } from "zustand";
import { signup } from "@/fetch/signup";


const signUpState = (set)=>({
    createUser: async(data)=>{
        const signUpRes = await signup(data);
        return signUpRes;
    },
});

const userSignUpState = create(signUpState);
export default userSignUpState;