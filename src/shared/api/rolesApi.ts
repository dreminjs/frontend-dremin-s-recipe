import { baseApi } from "../api/baseApi";

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAdmin: builder.query({
      query: (body) => ({
        url: "auth/checkAdminStatus",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCheckAdminQuery } = rolesApi;
