import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../../config/config";
import { usePrepareHeaders } from "../../../lib/headers";
import {
  ClientesAnalitica,
  PedidosAnalitica,
  ProductosAnalitica,
} from "../types/analitics.entity";

export const apiAnalitics = createApi({
  reducerPath: "apiAnalitics",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
    prepareHeaders: usePrepareHeaders,
  }),
  endpoints: (builder) => ({
    getAnaliticsProducts: builder.query<ProductosAnalitica[], void>({
      query: () => "/analitics/productos",
    }),
    getAnaliticsPedidos: builder.query<{ diario: PedidosAnalitica[] }, void>({
      query: () => "/analitics/pedidos",
    }),
    getAnaliticsClient: builder.query<ClientesAnalitica[], void>({
      query: () => ({
        url: "/analitics/clientes",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAnaliticsClientQuery,
  useGetAnaliticsPedidosQuery,
  useGetAnaliticsProductsQuery,
} = apiAnalitics;
