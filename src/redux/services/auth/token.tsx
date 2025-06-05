import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../../../utils/constants";
import { RootState } from "../../../redux/store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_HOST}/api/`,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = (api.getState() as RootState).auth.user?.refresh;

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { access, refresh } = refreshResult.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({}),
});
