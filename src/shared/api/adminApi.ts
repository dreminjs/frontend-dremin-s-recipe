import { baseApi } from "./baseApi";
import build from "next/dist/build";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postType: builder.mutation({
      query: (body) => ({
        url: "admin/types",
        body,
        method: "POST",
      }),
    }),
    rejectRecipe: builder.mutation({
      query: (id) => ({
        url: `admin/rejectRecipe/${id}`,
        method: "PATCH",
      }),
    }),
    checkRecipe: builder.mutation({
      query: (id) => ({
        url: `admin/checkRecipe/${id}`,
        method: "PATCH",
      }),
    }),
    postHoliday: builder.mutation({
      query: (body) => ({
        url: "admin/holidays",
        body,
        method: "POST",
      }),
    }),
    postNationalCuisine: builder.mutation({
      query: (body) => ({
        url: "admin/nationalCuisines",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePostHolidayMutation,
  usePostNationalCuisineMutation,
  usePostTypeMutation,
  useCheckRecipeMutation,
  useRejectRecipeMutation,
} = adminApi;
