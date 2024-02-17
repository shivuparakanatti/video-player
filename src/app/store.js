import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "../features/videoSlice";

export const store=configureStore({
    reducer :{
        videoSlice : videoSlice
    }
})