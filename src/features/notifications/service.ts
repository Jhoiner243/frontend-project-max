import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../config/config";
import { prepareHeaders } from "../../lib/headers";
import {
  NotificationsEnabledState,
  NotificationState,
} from "../../store/notifications/slice";

export const fetchBaseApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  endpoints: (build) => ({
    // Example endpoint
    getNotifications: build.query<NotificationState[], void>({
      query: () => ({
        credentials: "include",
        prepareHeaders: prepareHeaders,
        url: "/notifications",
        method: "GET",
      }),
    }),
    createNotification: build.mutation<
      NotificationsEnabledState,
      Partial<NotificationsEnabledState>
    >({
      query: (newNotification) => ({
        credentials: "include",
        prepareHeaders: prepareHeaders,
        url: "/notifications",
        method: "POST",
        body: newNotification,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useCreateNotificationMutation } =
  fetchBaseApi;
