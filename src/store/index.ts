import { configureStore } from "@reduxjs/toolkit";
import { apiAnalitics } from "../features/analytics/service/api";
import { fetchBaseAuth } from "../features/auth/services/service";
import { fetchApiInvoices } from "../features/invoices/service/api";
import { fetchBaseApi } from "../features/notifications/service";
import { api } from "../hooks/use-fetch-cancelar";
import { ApiLLM } from "./ai/api";
import { aiSlice } from "./ai/slice";
import { fetchApiCategories } from "./categories/api";
import { productsApi } from "./productos/api";
import { ApiProfit } from "./profit/api";

export const store = configureStore({
  reducer: {
    ai: aiSlice.reducer,
    [ApiProfit.reducerPath]: ApiProfit.reducer,
    [fetchBaseApi.reducerPath]: fetchBaseApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [fetchBaseAuth.reducerPath]: fetchBaseAuth.reducer,
    [fetchApiCategories.reducerPath]: fetchApiCategories.reducer,
    [fetchApiInvoices.reducerPath]: fetchApiInvoices.reducer,
    [apiAnalitics.reducerPath]: apiAnalitics.reducer,
    [ApiLLM.reducerPath]: ApiLLM.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiProfit.middleware,
      productsApi.middleware,
      ApiLLM.middleware,
      apiAnalitics.middleware,
      fetchBaseApi.middleware,
      fetchBaseAuth.middleware,
      fetchApiCategories.middleware,
      fetchApiInvoices.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
