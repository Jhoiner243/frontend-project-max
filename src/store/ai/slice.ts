// store/ai/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  chatUser: string[];
  responseChat: string[];
}

const initialState: ChatState = {
  chatUser: [],
  responseChat: [],
};

export const aiSlice = createSlice({
  name: "ai-llm",
  initialState,
  reducers: {
    addChatMessage: (state, action: PayloadAction<string>) => {
      state.chatUser.push(action.payload);
    },
    addResponseChat: (state, action: PayloadAction<string>) => {
      state.responseChat.push(action.payload);
    },
  },
});

export const { addChatMessage, addResponseChat } = aiSlice.actions;
export default aiSlice.reducer;
