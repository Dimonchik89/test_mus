import { configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import tracks from "./tracks/tracksSlice";

const store = configureStore({
    reducer: {
        categories,
        tracks
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;