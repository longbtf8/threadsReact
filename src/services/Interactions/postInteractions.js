import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../baseQuery";

export const postInteractions = createApi({
  reducerPath: "postInteractions",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://threads.f8team.dev/api",
  }),
  //   tagTypes: ["post"],

  endpoints: (builder) => ({
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      providesTags: ["post"],
    }),
  }),
});
export const { useLikePostMutation } = postInteractions;
