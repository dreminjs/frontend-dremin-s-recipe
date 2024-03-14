import { baseApi } from "@/shared";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "auth/refresh",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useRefreshQuery,
  useLogoutMutation,
} = authApi;
