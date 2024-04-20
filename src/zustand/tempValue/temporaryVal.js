import { create } from "zustand";
import { createCategory } from "@/fetch/createCategory";
import { getCategory } from "@/fetch/getCategory";
import { deleteCategory } from "@/fetch/deleteCategory";
import { updateCategory } from "@/fetch/updateCategory";
import { createItem } from "@/fetch/createItem";
import { showItems } from "@/fetch/showItems";


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
            addButton:false,
            itemSearchButton:false,
            itemAddButton:false,
        }))
    },
    addButton:false,
    setAddButton:(finalState)=>{
        set((state)=>({
            addButton: finalState,
            searchButton:false,
            itemAddButton:false,
            itemSearchButton:false,
        }))
    },
    insertList:[],
    setInserList:(insertVal)=>{
        set((state)=>({
            insertList:[...state.insertList,insertVal]
        }))
    },
    insertItemList:[],
    setInsertItemList:(insertVal)=>{
        set((state)=>({
            insertItemList:[...state.insertItemList,insertVal]
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
    categoryRefetch:0,
    setCategoryRefetch:()=>{
        set((state)=>({
            categoryRefetch: state.categoryRefetch + 1,
        }));
    },
    createCategory:(id)=>{
        set(async(state)=>{
            for(const catValue of state.insertList){
                const userId = id;
                const createCat = await createCategory({
                    catValue,
                    userId
                })
            }
            state.setCategoryRefetch()
            state.setSubmitButtonState(false)
            state.setAddButton(false)
            state.clearCategory()
        })
    },
    catRes:[],
    getCategories: async(userId)=>{
        const categoryData = await getCategory(userId);
        set((state)=>({
            catRes: categoryData
        }))
    },
    updateDelete: null,
    setUpdateDelete:(id)=>{
        set((state)=>({
            updateDelete: id
        }))
    },
    confirmUpdateDelete: "",
    setConfirmUpdateDelete:(confirm)=>{
        set((state)=>({
            confirmUpdateDelete: confirm
        }))
    },
    deleteUpdateState:null,
    setDeleteUpdateState:(id)=>{
        set(()=>({
            deleteUpdateState: id,
            confirmUpdateDelete: "",
            updateDelete:null,
            editIconState:null,
        }))
    },
    deleteCategoryRes:[],
    confirmDeleteCategory:async(id)=>{

        const deletedCat = await deleteCategory(id)
        set((state)=>{
            if(deletedCat?.success){
                state.setCategoryRefetch()
                state.setDeleteUpdateState(null)
                state.setItemRefetch()
                state.setGetCategoryName(null)
            }
            return {
                deleteCategoryRes: deletedCat
            }
        })
    },
    showInputUpdate:null,
    setShowInputUpdate:(id)=>{
        set(()=>({
            showInputUpdate:id
        }))
    },
    setUpdateCategory: async(dataObj)=>{
        const updateRes = await updateCategory(dataObj)
        set((state)=>{
            if(updateRes?.success){
                state.setCategoryRefetch()
                state.setDeleteUpdateState(null)
                state.setConfirmUpdateDelete("")
                state.setUpdateDelete(null)
                state.setEditIconState(null)
                state.setShowInputUpdate(null)
            }else if(!updateRes?.success){
                state.setDeleteUpdateState(null)
                state.setConfirmUpdateDelete("")
                state.setUpdateDelete(null)
                state.setEditIconState(null)
                state.setShowInputUpdate(null)
            }
           return updateRes 
        })
    },
    getCategoryName: null,
    setGetCategoryName:(categoryData)=>{
        set((state)=>({
            getCategoryName: categoryData
        }))
    },
    categoryHover:null,
    setCategoryHover:(id)=>{
        set(()=>({
            categoryHover: id
        }))
    },
    itemSearchButton:false,
    setItemSearchButton:(finalState)=>{
        set((state)=>({
            itemSearchButton: finalState,
            addButton:false,
            searchButton: false,
            itemAddButton:false,
        }))
    },
    itemSearchVal: "",
    setItemSearchVal:(val)=>{
        set(()=>({
            itemSearchVal:val
        }))
    },
    itemAddButton:false,
    setItemAddButton:(finalState)=>{
        set((state)=>({
            itemAddButton: finalState,
            searchButton:false,
            itemSearchButton:false,
            addButton:false,
        }))
    },
    removeInsertedItemList:(id)=>{
        set((state)=>{
            const recentList = [...state.insertItemList]
            recentList.splice(id,1)
            return {
                insertItemList: recentList
            }
        })
    },
    insertItemId:null,
    setInsertItemId:(id)=>{
        set((state)=>({
            insertItemId:id
        }))
    },
    submitItemButtonState:false,
    setSubmitItemButtonState:(finalState)=>{
        set((state)=>({
            submitItemButtonState: finalState
        }))
    },
    createItemsRes:null,
    setCreateItems: async (dataObj)=>{
        const createItemResponse = await createItem(dataObj)
        set((state)=>{
            if(createItemResponse.success){
                state.setItemAddButton(false)
            }
            return {createItemsRes:createItemResponse}
        })
        return createItemResponse
    },
    showCreatedItems:[],
    setShowCreatedItems:async(catName)=>{
        if(catName){
            try {
                const showItemsResponse = await showItems(catName?.categoryId);
                set({ showCreatedItems: showItemsResponse });
                return showItemsResponse 
            } catch (error) {
                console.error("Error Fetching Items",error)
            }
        }
    },
    itemRefetch:0,
    setItemRefetch:()=>{
        set((state)=>({
            itemRefetch: state.itemRefetch + 1,
        }));
    },

})

const useCreateObj = create(createObj);
export default useCreateObj;