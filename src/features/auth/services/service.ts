import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../../config/config";
import { LoginDTO, LogingResponse, RegisterDTO } from "../auth.types";

export const fetchBaseAuth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  endpoints: (build) => ({
    createUser: build.mutation<RegisterDTO, RegisterDTO>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: build.mutation<LogingResponse, LoginDTO>({
      query: (loginData) => ({
        credentials: "include",
        prepareHeaders: (headers: Headers) => {
          const token = localStorage.getItem("access_token");

          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }

          return headers;
        },
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logoutUser: build.mutation<void, void>({
      query: () => ({
        credentials: "include",
        prepareHeaders: (headers: Headers) => {
          const token = localStorage.getItem("access_token");

          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }

          return headers;
        },
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = fetchBaseAuth;
