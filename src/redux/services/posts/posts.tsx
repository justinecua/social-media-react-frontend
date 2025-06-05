import { api } from "../auth/token";

const timeout = 60000;

export const receivedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ offset = 0, limit = 5 }) => ({
        url: `posts/getPosts/?offset=${offset}&limit=${limit}`,
        method: "GET",
        timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
    getComments: builder.query({
      query: ({ post_id }) => ({
        url: `interactions/showComments/${post_id}`,
        method: "GET",
        timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const { useGetPostsQuery, useGetCommentsQuery } = receivedApi;
