import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../../../utils/constants";

const timeout = 60000;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/api/accounts/`,
    timeout: timeout,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ ...body }) => ({
        url: "login/",
        method: "POST",
        body: body,
        timeout: timeout,
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response,
    }),
    forgotPassword: builder.mutation({
      query: ({ ...body }) => ({
        url: "forgotPassword/",
        method: "POST",
        body: body,
        timeout: timeout,
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response,
    }),
    resetPassword: builder.mutation({
      query: ({ token, new_password }) => ({
        url: "resetPassword/",
        method: "POST",
        body: {
          token,
          new_password,
        },
        timeout: timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
    refresh: builder.mutation({
      query: ({ ...body }) => ({
        url: "token/refresh/",
        method: "POST",
        body: body,
        timeout: timeout,
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response,
    }),
    logout: builder.mutation({
      query: ({ ...body }) => ({
        url: "logout/",
        method: "POST",
        body: body,
        timeout: timeout,
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response,
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
