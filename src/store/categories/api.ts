import { VITE_API_URL } from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryEntity } from "../../features/products/product.type";
import { prepareHeaders } from "../../lib/headers";

export const fetchApiCategories = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryEntity[], void>({
      query: () => ({
        credentials: "include",
        prepareHeaders: prepareHeaders,
        url: "/category",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      transformResponse: (response) => response.json(),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = fetchApiCategories;
