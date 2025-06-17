import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { usePrepareHeaders } from "../../lib/headers";
import { CreatedEntity, RegisterEntidad } from "./types/register-entidad";

export const entidadesApi = createApi({
  reducerPath: "entidadesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: usePrepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Entidades"],
  endpoints: (builder) => ({
    createEntidad: builder.mutation<
      Promise<{ message: string; datos: CreatedEntity }>,
      RegisterEntidad
    >({
      query: (data) => ({
        url: "/entidad-create",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateEntidadMutation } = entidadesApi;
