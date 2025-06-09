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
  tagTypes: ["Facturas"],
  endpoints: (builder) => ({
    getAllInvoicesStatus: builder.query<
      {
        facturas: FacturaSeccion[];
        lastPages: number;
        totalFact: number;
      },
      { page: number; limit: number; status: FacturaStatus }
    >({
      query: ({ limit, page, status }) => ({
        url: `/factura/with-status?page=${page}&limit=${limit}&status=${status}`,
        method: "GET",
      }),
    }),
    getInvoices: builder.query<
      {
        facturas: FacturaSeccion[];
        lastPages: number;
        totalFact: number;
      },
      { page: number; limit: number }
    >({
      query: ({ limit, page }) => {
        return {
          url: `/facturas?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.facturas.map((factura) => ({
                type: "Facturas" as const,
                id: factura.id,
              })),
              { type: "Facturas", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Facturas", id: "PARTIAL-LIST" }],
    }),

    createInvoice: builder.mutation({
      query: (newInvoice) => ({
        url: "/factura",
        method: "POST",
        body: newInvoice,
      }),
      invalidatesTags: [
        { type: "Facturas" },
        { type: "Facturas", id: "PARTIAL-LIST" },
      ],
    }),

    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/facturas/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Facturas", id },
        { type: "Facturas", id: "PARTIAL-LIST" },
      ],
    }),

    putInvoice: builder.mutation<
      FacturaStatus,
      { id: string; data: FacturaSeccion }
    >({
      query: ({ id, data }) => ({
        url: `/facturas/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Facturas", id },
        { type: "Facturas", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useLazyGetInvoicesQuery,
  useGetAllInvoicesStatusQuery,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  usePutInvoiceMutation,
} = fetchApiInvoices;
