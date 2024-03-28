import { baseApi } from "@/shared";
import { useEffect } from "react";
import { setActivate, setAdmin, setAuth } from "..";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { QueryArgFrom } from "@reduxjs/toolkit/query";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        credentials: "include",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        handleAuthData(dispatch, queryFulfilled);
      },
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        credentials: "include",
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        handleAuthData(dispatch, queryFulfilled);
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: "auth/refresh",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        handleAuthData(dispatch, queryFulfilled);
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        handleAuthData(dispatch, queryFulfilled);
      },
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useRefreshQuery,
  useLogoutMutation,
} = authApi;

const handleAuthData = async (
  dispatch: ThunkDispatch<any, any, UnknownAction>,
  queryFulfilled: any
) => {
  try {
    const { data } = await queryFulfilled;

    if (data?.isAuth) {
      dispatch(setAuth(data.isAuth));
    }
    if (data?.isAdmin) {
      dispatch(setAdmin(data.isAdmin));
    }
    if (data?.isActivated) {
      dispatch(setActivate(data.isActivated));
    }
  } catch (e) {
    console.log(e);
  }
};
