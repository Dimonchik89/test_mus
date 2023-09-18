import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openAlert: false
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        handleOpenAlert: (state) => {
            state.openAlert = true;
        },
        handleCloseAlert: (state) => {
            state.openAlert = false;
        }
    }
})

const {actions, reducer} = alertSlice;
export const { handleCloseAlert, handleOpenAlert } = actions;

export default reducer;