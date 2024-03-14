import { authSlice } from "@/features/auth";
import { baseApi, characteristicsSlice } from "@/shared";
import { recipeComponentsSlice } from "@/widgets/Recipe";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [characteristicsSlice.name]: characteristicsSlice.reducer,
  [recipeComponentsSlice.name]: recipeComponentsSlice.reducer,
});
