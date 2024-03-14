import { baseApi } from "../api/baseApi";

const characteristicsApi = baseApi.injectEndpoints({
  endpoints: (buidler) => ({
    getTypes: buidler.query({
      query: (body) => ({
        url: `characteristics/types?page=${body.page}${
          (body.search && `&search=${body.search}`) || ""
        }`,
      }),
    }),
    getNationalCuisines: buidler.query({
      query: (body) => ({
        url: `characteristics/nationalCuisines?page=${body.page}${
          (body.search && `&search=${body.search}`) || ""
        }`,
      }),
    }),
    getHolidays: buidler.query({
      query: (body) => ({
        url: `characteristics/holidays?page=${body.page}${
          (body.search && `&search=${body.search}`) || ""
        }`,
      }),
    }),
    editType: buidler.mutation({
      query: (body) => ({
        url: `admin/types/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    editNationalCuisine: buidler.mutation({
      query: (body) => ({
        url: `admin/nationalCuisines/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    editHoliday: buidler.mutation({
      query: (body) => ({
        url: `admin/holidays/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetHolidaysQuery,
  useGetNationalCuisinesQuery,
  useGetTypesQuery,
  useEditTypeMutation,
  useEditHolidayMutation,
  useEditNationalCuisineMutation,
} = characteristicsApi;
