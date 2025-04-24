import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../../config/config";
import { FacturaSeccion } from "../types/factura.types";

export const fetchApiInvoices = createApi({
  reducerPath: "invoicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  endpoints: (builder) => ({
    getInvoices: builder.query<FacturaSeccion[], void>({
      query: () => ({
        credentials: "include",
        prepareHeaders: (headers: Headers) => {
          const token = localStorage.getItem("access_token");
          if (!token) {
            return headers;
          }

          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
        url: "/facturas",
        method: "GET",
      }),
    }),
    createInvoice: builder.mutation({
      query: (newInvoice) => ({
        url: "/invoices",
        method: "POST",
        body: newInvoice,
      }),
      transformResponse: (response) => response.json(),
    }),
    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
} = fetchApiInvoices;
