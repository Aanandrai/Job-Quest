import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import authSlice from "./authSlice";

const store=configureStore({
    // reducer:{
    //     auth:authSlice,
    //     loading:loadingSlice 
    // }
    reducer:loadingSlice,
    reducer:authSlice
})

export default store