import { api } from "../auth/token";

const timeout = 60000;

export const receivedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (body) => ({
        url: `/interactions/addComment/`,
        method: "POST",
        body: body,
        timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const { useAddCommentMutation } = receivedApi;
