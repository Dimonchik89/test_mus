import { configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import tracks from "./tracks/tracksSlice";
import user from "./user/userSlice";
import alert from "./alert/alertSlice";

const store = configureStore({
    reducer: {
        categories,
        tracks,
        user,
        alert
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;