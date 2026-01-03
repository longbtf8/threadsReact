import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQuery";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useLoginMutation } = loginApi;
