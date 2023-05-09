import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

const {actions, reducer} = categoriesSlice
export const {setCategories} = actions
export default reducer