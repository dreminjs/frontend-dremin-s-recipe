import { baseApi } from "@/shared";
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
} = adminApi;
