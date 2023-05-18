import { configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import tracks from "./tracks/tracksSlice";
import user from "./user/userSlice";

const store = configureStore({
    reducer: {
        categories,
        tracks,
        user
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;