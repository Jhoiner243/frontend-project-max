import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../../config/config";
import { usePrepareHeaders } from "../../../lib/headers";
import { FacturaStatus } from "../components/ui/estado-invoice";
import { FacturaSeccion } from "../types/factura.types";

export const fetchApiInvoices = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: usePrepareHeaders,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getInvoices: builder.query<FacturaSeccion[], void>({
      query: () => ({
        url: "/facturas",
        method: "GET",
      }),
    }),
    createInvoice: builder.mutation({
      query: (newInvoice) => ({
        url: "/factura",
        method: "POST",
        body: newInvoice,
      }),
      transformResponse: (response) => response.json(),
    }),
    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/facturas/${id}`,
        method: "DELETE",
      }),
    }),
    putInvoice: builder.mutation<
      FacturaStatus,
      { id: string; data: FacturaSeccion }
    >({
      query: ({ id, data }: { id: string; data: FacturaSeccion }) => ({
        url: `/facturas/${id}`,
        body: data,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  usePutInvoiceMutation,
} = fetchApiInvoices;
