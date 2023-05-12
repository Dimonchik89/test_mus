import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    userEmail: null,
    userRole: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.id;
            state.userEmail = action.payload.email;
            state.userRole = action.payload.role;
        },
        resetUser: state => {
            state.userId = null;
            state.userEmail = null;
            state.userRole = null;
        }
    }
})

const {actions, reducer} = userSlice
export const {setUser, resetUser} = actions
export default reducer