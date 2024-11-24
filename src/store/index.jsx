import { configureStore } from "@reduxjs/toolkit";
import article from "./article"
import map from "./map"
const store = configureStore({
    reducer: {
        article: article,
        map: map
    }
})
export default store