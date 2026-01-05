import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQuery";
import ResetPassword from "@/pages/Auth/ResetPassword";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: `/auth/user`,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        data: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        data: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: email,
      }),
    }),
    ResetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserInfoQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
