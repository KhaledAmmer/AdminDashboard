import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/global";


const store = configureStore({
    reducer: {
        global: globalReducer,
    },
});

export default store;