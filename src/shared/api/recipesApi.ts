import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./baseApi";

const recipesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: (body) => ({
        url: `/recipes?page=${body.page}${
          body.search ? `&search=${body.search}` : ""
        }${body.searchParams ? body.searchParams : ""}${
          body.orderBy ? `&orderBy=${body.orderBy || "none"}` : ""
        }${
          body.isRejected !== undefined ? `&isRejected=${body.isRejected}` : ""
        }${body.isChecked !== undefined ? `&isChecked=${body.isChecked}` : ""}`,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/recipes/${id}`,
      }),
    }),
    getOwnRecipes: builder.query({
      query: (body) => ({
        url: `recipes/ownRecipes?page=${body.page || 1}&${
          body.search ? `search=${body.search}` : ""
        }${body.searchParams ? body.searchParam : ""}${
          body.isRejected !== undefined ? `&isRejected=${body.isRejected}` : ""
        }${body.isChecked !== undefined ? `&isChecked=${body.isChecked}` : ""}${
          body.likedRecipes !== undefined
            ? `&likedRecipes=${body.likedRecipes}`
            : ""
        }`,
        credentials: "include",
      }),
    }),
    getUserRecipes: builder.query({
      query: (body) => ({
        url: `recipes/user/${body.id}?page=${body.page}${
          body.search && `&search=${body.search}`
        }`,
      }),
    }),
    getUserLikedRecipes: builder.query({
      query: (body) => ({
        url: `recipes/liked/user/${body.id}?page=${body.page}${
          body.search && `&search=${body.search}`
        }`,
      }),
    }),
    getLikedRecipes: builder.query({
      query: (body) => ({
        url: `recipes/liked?page=${body.page}${
          body.search && `&search=${body.search}`
        }`,
        credentials: "include",
      }),
    }),
    getRecipe: builder.query({
      query: (id) => ({
        url: `recipes/${id}`,
      }),
    }),
    editRecipe: builder.mutation({
      query: (body) => ({
        url: `recipes/${body.id}`,
        body: body.data,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useDeleteRecipeMutation,
  useGetOwnRecipesQuery,
  useGetLikedRecipesQuery,
  useGetRecipeQuery,
  useEditRecipeMutation,
  useGetUserRecipesQuery,
  useGetUserLikedRecipesQuery,
} = recipesApi;
