/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/api.ts
import { VITE_API_URL } from "@/config/config";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { ApiError } from "./use-fetch-cancel"; // Ajusta la ruta si la tienes en otro sitio

export interface ResponseDTO<T> {
  data: T | null;
  status: number;
  message?: string;
  url: string;
  timestamp: string;
}

type CacheMode = "no-store" | "reload" | "force-cache";

// Aseguramos que la variable de entorno esté definida
if (!VITE_API_URL) {
  throw new Error("VITE_API_URL no está definida");
}

// Configuramos el baseQuery con fetchBaseQuery y prepareHeaders
const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Creamos el API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    // Endpoint genérico para GET
    getFetch: builder.query<
      ResponseDTO<any>,
      { url: string; cacheMode?: CacheMode }
    >({
      query: ({ url, cacheMode = "no-store" }) =>
        ({
          url,
          method: "GET",
          cache: cacheMode,
        } as FetchArgs),
      transformResponse: (response: any, meta, arg) => ({
        data: response,
        status: meta?.response?.status ?? 0,
        url: arg.url,
        timestamp: new Date().toISOString(),
      }),
      transformErrorResponse: (error: FetchBaseQueryError, meta) => {
        const status = "status" in error ? error.status! : 500;
        const title = (error.data as any)?.title || "Fetch Error";
        const message = (error.data as any)?.message || error!;
        return new ApiError(
          Number(status),
          meta ? JSON.stringify(meta) : "",
          title,
          message
        );
      },
    }),

    // Endpoint genérico para POST / PUT / DELETE
    doFetch: builder.mutation<
      ResponseDTO<any>,
      {
        url: string;
        data?: any;
        method?: "POST" | "PUT" | "DELETE";
        cacheMode?: CacheMode;
      }
    >({
      query: ({ url, data, method = "POST", cacheMode = "no-store" }) =>
        ({
          url,
          method,
          body: data,
          cache: cacheMode,
        } as FetchArgs),
      transformResponse: (response: any, meta, arg) => ({
        data: response,
        status: meta?.response?.status ?? 0,
        url: arg.url,
        timestamp: new Date().toISOString(),
      }),
      transformErrorResponse: (error: FetchBaseQueryError, meta) => {
        const status = "status" in error ? error.status! : 500;
        const title = (error.data as any)?.title || "Fetch Error";
        const message = (error.data as any)?.message || error!;
        return new ApiError(
          Number(status),
          meta ? JSON.stringify(meta) : "",
          title,
          message
        );
      },
    }),
  }),
});

// Hooks auto-generados
export const { useGetFetchQuery, useDoFetchMutation } = api;
