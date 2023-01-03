import { configureStore } from "@reduxjs/toolkit";
import { chatGroupSlice } from "./chatGroup/chatGroupSlice";
import { contactSlice } from "./contactList/contactListSlice";

export const store = configureStore({
  reducer: {
    chatGroup: chatGroupSlice.reducer,
    contacts: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
