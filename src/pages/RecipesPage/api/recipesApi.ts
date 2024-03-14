import { baseApi } from "@/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recipesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRecipes: build.query({
      query: (body) => ({
        url: `/recipes?page=${body.page}${
          body.search && `&search=${body.search}`
        }&${body.searchParams && body.searchParams}`,
      }),
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
