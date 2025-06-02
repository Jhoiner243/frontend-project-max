import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { GananciasEntity } from "../../features/profit/types/profit.entity";
import { usePrepareHeaders } from "../../lib/headers";

export const apiProfit = createApi({
  reducerPath: "apiProfit",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
    prepareHeaders: usePrepareHeaders,
  }),

  endpoints: (builder) => ({
    getProfit: builder.query<GananciasEntity[], void>({
      query: () => ({
        url: "/profit",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfitQuery, useLazyGetProfitQuery } = apiProfit;
