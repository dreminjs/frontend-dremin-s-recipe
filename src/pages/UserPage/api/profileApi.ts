import { baseApi } from "@/shared";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserInfo: builder.query({
      query: (body) => ({
        url: "user",
      }),
    }),
    getUserInfo: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
    }),
    getOwnRecipes: builder.query({
      query: (body) => ({
        url: `/ownRecipes?page=${body.page}${
          body.search && `&search=${body.search}`
        }&${body.searchParams && body.searchParams}`,
      }),
    }),
  }),
});

export const {
  useGetOwnRecipesQuery,
  useGetCurrentUserInfoQuery,
  useGetUserInfoQuery,
} = userApi;
