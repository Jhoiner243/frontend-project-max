import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import {
  clientCreate,
  ClientEntity,
} from "../../features/clients/client.types";
import { usePrepareHeaders } from "../../lib/headers";

export const ApiClients = createApi({
  reducerPath: "apiClients",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: usePrepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Clients"] as const,
  endpoints: (builder) => ({
    getClientById: builder.query<ClientEntity, { id: string }>({
      query: ({ id }) => ({
        url: `/cliente-by-id/${id}`,
        method: "GET",
      }),
    }),
    getClients: builder.query<
      { clientes: ClientEntity[]; lastPage: number; total: number },
      void
    >({
      query: () => ({
        url: "/clientes",
        method: "GET",
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Clients" as const, id })),
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }],
    }),
    createClient: builder.mutation<void, clientCreate>({
      query: (newClient) => ({
        url: "/clientes",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),
    updateClient: builder.mutation<
      void,
      { data: Partial<clientCreate>; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/clientes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Clients", id: arg.id },
        { type: "Clients", id: "LIST" },
      ],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clientes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Clients", id },
        { type: "Clients", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useLazyGetClientsQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
} = ApiClients;
