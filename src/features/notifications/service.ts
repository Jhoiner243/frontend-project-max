// src/service/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { prepareHeaders } from "../../lib/headers";
import {
  NotificationsEnabledState,
  NotificationState,
} from "../../store/notifications/slice";

export const fetchBaseApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
    prepareHeaders,
  }),
  endpoints: (build) => ({
    getNotifications: build.query<NotificationState[], void>({
      query: () => "/notifications",
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

export const { useGetNotificationsQuery, useCreateNotificationMutation } =
  fetchBaseApi;
