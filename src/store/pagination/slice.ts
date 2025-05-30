import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Estado inicial como número
const initialValue: number = 10;

const SelectLimit = createSlice({
  name: "limit",
  initialState: initialValue,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      return action.payload; // reemplaza el valor actual
    },
  },
});

export const { setLimit } = SelectLimit.actions;
export default SelectLimit.reducer;
