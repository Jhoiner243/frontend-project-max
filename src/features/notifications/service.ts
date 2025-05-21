// src/service/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { usePrepareHeaders } from "../../lib/headers";
import {
  NotificationsEnabledState,
  NotificationState,
} from "../../store/notifications/slice";

export const fetchBaseApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
    prepareHeaders: usePrepareHeaders,
  }),
  endpoints: (build) => ({
    getNotifications: build.query<NotificationState[], void>({
      query: () => "/notifications",
    }),
    deleteNotification: build.mutation<void, { id: string }>({
      query: (id) => ({
        url: `/notifications-delete/${id.id}`,
        method: "DELETE",
      }),
    }),
    createNotification: build.mutation<
      NotificationsEnabledState,
      Partial<NotificationsEnabledState>
    >({
      query: (newNotification) => ({
        url: "/notifications",
        method: "POST",
        body: newNotification,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = fetchBaseApi;
