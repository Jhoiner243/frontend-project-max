import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import {
  ProductEntity,
  ProductoSeccion,
} from "../../features/products/product.type";
import { usePrepareHeaders } from "../../lib/headers";

export const productsApi = createApi({
  reducerPath: "productsApiState",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: usePrepareHeaders,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductoSeccion[], void>({
      query: () => ({
        url: "/productos",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<
      void,
      { id: string; data: Partial<ProductEntity> }
    >({
      query: ({ id, data }) => ({
        url: `/productos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/productos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useUpdateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useLazyGetProductsQuery,
} = productsApi;
