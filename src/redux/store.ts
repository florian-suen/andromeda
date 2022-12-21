import { configureStore } from "@reduxjs/toolkit";
import { chatGroupSlice } from "./chatGroup/chatGroupSlice";

export const store = configureStore({
  reducer: { chatGroup: chatGroupSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
