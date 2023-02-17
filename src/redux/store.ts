import { configureStore } from "@reduxjs/toolkit";
import { chatGroupSlice } from "./chatGroup/chatGroupSlice";
import { contactSlice } from "./contactList/contactListSlice";
import { currentUserSlice } from "./currentUser/currentUserSlice";
import { messageSlice } from "./messages/messageSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
  reducer: {
    chatGroup: chatGroupSlice.reducer,
    contacts: contactSlice.reducer,
    messages: messageSlice.reducer,
    currentUser: currentUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
