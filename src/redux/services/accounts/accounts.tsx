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
    getProfile: builder.query({
      query: ({ profile_id }) => ({
        url: `accounts/profile/${profile_id}`,
        method: "GET",
        timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
    getTotalFriends: builder.query({
      query: ({ account_id }) => ({
        url: `/friends/getTotalFriends/${account_id}`,
        method: "GET",
        timeout,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

export const {
  useGetNewUsersQuery,
  useGetProfileQuery,
  useGetTotalFriendsQuery,
} = accounts;
