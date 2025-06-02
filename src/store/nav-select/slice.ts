import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const valueInitial = "";

const selectedNav = createSlice({
  name: "selectedNav",
  initialState: valueInitial,
  reducers: {
    selectItemNav: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { selectItemNav } = selectedNav.actions;
export default selectedNav.reducer;
