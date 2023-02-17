import { configureStore } from "@reduxjs/toolkit";
import RecipeReducer from "./slices/recipeSlice";
import UserReducer from "./slices/userSlice";

export const store = configureStore({
    reducer:{
        recipeReducer: RecipeReducer,
        userReducer: UserReducer,
    }
})