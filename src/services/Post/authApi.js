import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQuery";

export const postApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  tagTypes: ["post"],

  endpoints: (builder) => ({
    getPostsFeed: builder.query({
      query: () => ({
        url: `/posts/feed/`,
      }),
      providesTags: ["post"],
    }),
  }),
});
export const { useGetPostsFeedQuery } = postApi;
