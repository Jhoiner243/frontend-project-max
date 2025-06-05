import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import {
  EditDataFactProps,
  FacturaSeccion,
  FacturasEntity,
} from "../../features/invoices/types/factura.types";
import { usePrepareHeaders } from "../../lib/headers";

export const apiInvoices = createApi({
  reducerPath: "apiInvoices",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: usePrepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Facturas"],
  endpoints: (builder) => ({
    getFacturas: builder.query<FacturaSeccion[], void>({
      query: () => ({
        url: "/facturas",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Facturas" as const, id })),
              { type: "Facturas", id: "LIST" },
            ]
          : [{ type: "Facturas", id: "LIST" }],
    }),
    createFactura: builder.mutation<void, FacturasEntity>({
      query: (newFactura) => ({
        url: "/factura",
        method: "POST",
        body: newFactura,
      }),
      invalidatesTags: (_result, _error, { detalles }) => [
        { type: "Facturas", detalles },
        { type: "Facturas", id: "LIST" },
      ],
    }),
    getFacturaById: builder.query<EditDataFactProps, string>({
      query: (id) => ({
        url: `/factura/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Facturas", id },
        { type: "Facturas", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateFacturaMutation,
  useGetFacturasQuery,
  useGetFacturaByIdQuery,
} = apiInvoices;
