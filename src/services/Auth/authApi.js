import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: `/auth/user`,
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["User"],
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
