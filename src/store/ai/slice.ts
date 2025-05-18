import { createSlice } from "@reduxjs/toolkit";
import { BaseResponseApiLLM } from "../../features/ai/types/llm.types";
const initialState: BaseResponseApiLLM = {
  message: "",
};
export const aiSlice = createSlice({
  name: "ai-llm",
  initialState,
  reducers: {},
});
