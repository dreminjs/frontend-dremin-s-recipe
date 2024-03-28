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
        credentials: "include",
      }),
    }),
    checkOwnerProfile: builder.query({
      query: (id) => ({
        url: `user/checkOwnerProfile/${id}`,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserInfoQuery,
  useGetUserInfoQuery,
  useCheckOwnerProfileQuery,
} = userApi;
