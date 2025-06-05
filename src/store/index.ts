import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiAnalitics } from "../features/analytics/service/api";
import { fetchBaseAuth } from "../features/auth/services/service";
import { fetchApiInvoices } from "../features/invoices/service/api";
import { fetchBaseApi } from "../features/notifications/service";
import { ApiLLM } from "./ai/api";
import { aiSlice } from "./ai/slice";
import { fetchApiCategories } from "./categories/api";
import { ApiClients } from "./clients/api";
import { apiInvoices } from "./invoices/api";
import selectItemNav from "./nav-select/slice";
import SelectLimit from "./pagination/slice";
import { productsApi } from "./productos/api";
import { apiProfit } from "./profit/api";

export const store = configureStore({
  reducer: {
    selectItemNav: selectItemNav,
    limit: SelectLimit,
    ai: aiSlice.reducer,
    [apiInvoices.reducerPath]: apiInvoices.reducer,
    [ApiClients.reducerPath]: ApiClients.reducer,
    [apiProfit.reducerPath]: apiProfit.reducer,
    [fetchBaseApi.reducerPath]: fetchBaseApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [fetchBaseAuth.reducerPath]: fetchBaseAuth.reducer,
    [fetchApiCategories.reducerPath]: fetchApiCategories.reducer,
    [fetchApiInvoices.reducerPath]: fetchApiInvoices.reducer,
    [apiAnalitics.reducerPath]: apiAnalitics.reducer,
    [ApiLLM.reducerPath]: ApiLLM.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiInvoices.middleware,
      ApiClients.middleware,
      apiProfit.middleware,
      productsApi.middleware,
      ApiLLM.middleware,
      apiAnalitics.middleware,
      fetchBaseApi.middleware,
      fetchBaseAuth.middleware,
      fetchApiCategories.middleware,
      fetchApiInvoices.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
