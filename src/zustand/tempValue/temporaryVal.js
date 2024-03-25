import { create } from "zustand";
import { createCategory } from "@/fetch/createCategory";
import { getCategory } from "@/fetch/getCategory";


const createObj = (set)=>({
    asideButtonColapseState: false,
    asideButtonColapseCall:(finalState)=>{
        set((state)=>({
            asideButtonColapseState: finalState
        }))
    },
    searchButton:false,
    setSearchButton:(finalState)=>{
        set((state)=>({
            searchButton: finalState,
            addButton:false
        }))
    },
    addButton:false,
    setAddButton:(finalState)=>{
        set((state)=>({
            addButton: finalState,
            searchButton:false
        }))
    },
    insertList:[],
    setInserList:(insertVal)=>{
        set((state)=>({
            insertList:[...state.insertList,insertVal]
        }))
    },
    insertId:null,
    setInsertId:(id)=>{
        set((state)=>({
            insertId:id
        }))
    },
    removeInsertedList:(id)=>{
        set((state)=>{
            const recentList = [...state.insertList]
            recentList.splice(id,1)
            return {
                insertList: recentList
            }
        })
    },
    clearCategory:()=>{
        set((state)=>({
            insertList: []
        }))
    },
    submitButtonState:false,
    setSubmitButtonState:(finalState)=>{
        set((state)=>({
            submitButtonState: finalState
        }))
    },
    showEditIcon:null,
    setShowEditIcon:(id)=>{
        set((state)=>({
            showEditIcon: id
        }))
    },
    editIconState:null,
    setEditIconState:(id)=>{
        set((state)=>({
            editIconState: id
        }))
    },
    // ----------------------------------Category-----------------------
    createCategory:(id)=>{
        set(async(state)=>{
            for(const catValue of state.insertList){
                const userId = id;
                const createCat = await createCategory({
                    catValue,
                    userId
                })
            }
            state.setSubmitButtonState(false)
            state.setAddButton(false)
            state.clearCategory()
        })
    },
    catRes:[],
    getCategory: async (userId)=>{
        const categoryData = await getCategory(userId);
        set((state)=>({
            catRes: categoryData
        }))
    }

})

const useCreateObj = create(createObj);
export default useCreateObj;