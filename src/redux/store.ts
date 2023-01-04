import { configureStore } from "@reduxjs/toolkit";
import { chatGroupSlice } from "./chatGroup/chatGroupSlice";
import { contactSlice } from "./contactList/contactListSlice";
import { messageSlice } from "./messages/messageSlice";

export const store = configureStore({
  reducer: {
    chatGroup: chatGroupSlice.reducer,
    contacts: contactSlice.reducer,
    messages: messageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
