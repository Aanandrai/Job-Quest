import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        loading:loadingSlice,
        job:jobSlice

    }
})

export default store