import { createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  id: string;
  is_read: boolean;
  message: string;
  createdAt: Date;
}

export interface NotificationsEnabledState {
  token: string;
}

export const initialState: NotificationState[] = [];

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;
