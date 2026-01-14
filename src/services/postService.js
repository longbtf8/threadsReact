import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  tagTypes: ["post"],

  endpoints: (builder) => ({
    getPostsFeed: builder.query({
      query: ({ type, page, per_page }) => ({
        url: `/posts/feed`,
        params: {
          type,
          per_page,
          page,
        },
      }),
      providesTags: ["post"],
    }),

    getPostId: builder.query({
      query: ({ id }) => ({
        url: `/posts/${id}`,
      }),
    }),

    // comment || create reply
    createReply: builder.mutation({
      query: ({ id, postData }) => ({
        url: `/posts/${id}/reply`,
        method: "POST",
        data: postData,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetPostsFeedQuery,
  useGetPostIdQuery,
  useCreateReplyMutation,
} = postApi;
