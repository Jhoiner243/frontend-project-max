import { configureStore } from "@reduxjs/toolkit";
import { fetchBaseAuth } from "../features/auth/services/service";
import { fetchApiInvoices } from "../features/invoices/service/api";
import { fetchBaseApi } from "../features/notifications/service";
import { api } from "../hooks/use-fetch-cancelar";
import { fetchApiCategories } from "./categories/api";

export const store = configureStore({
  reducer: {
    [fetchBaseApi.reducerPath]: fetchBaseApi.reducer,
    [fetchBaseAuth.reducerPath]: fetchBaseAuth.reducer,
    [fetchApiCategories.reducerPath]: fetchApiCategories.reducer,
    [fetchApiInvoices.reducerPath]: fetchApiInvoices.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fetchBaseApi.middleware,
      fetchBaseAuth.middleware,
      fetchApiCategories.middleware,
      fetchApiInvoices.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
