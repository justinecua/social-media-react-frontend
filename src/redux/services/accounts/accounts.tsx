import { api } from "../auth/token";

const timeout = 60000;

export const accounts = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewUsers: builder.query({
      query: () => ({
        url: `accounts/getNewUsers`,
        method: "GET",
        timeout: timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const { useGetNewUsersQuery } = accounts;
