import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { Media } from "../messages/messageSlice";

import { listbyUserContactFriend } from "./queries";

export type RequestStatusType = "ACCEPTED" | "BLOCKED" | "REQUESTED";
export interface ContactType {
  sender: boolean;
  requestStatus: string;
  _version: string;
  _deleted: string;
  friendID: string;
  id: string;
  userContact: { id: string; _version: string; requestStatus: string };
  friend: {
    inviteId: string;
    image: string;
    username: string;
    id: string;
    status: string;
    _deleted: string;
    Blog: {
      items: {
        createdAt: string;
        id: string;
        message: string;
        Media: { items: Media[] };
      }[];
    };
  };
}

export interface ContactState {
  contacts: ContactType[] | [];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}

const initialState: ContactState = {
  contacts: [],
  status: "idle",
  error: null,
};

export const getContactList = createAsyncThunk(
  "contactList/fetchContact",
  async (userId: string, { rejectWithValue }) => {
    const fetchContacts = await API.graphql(
      graphqlOperation(listbyUserContactFriend, {
        userID: userId,
      })
    );

    if ("data" in fetchContacts) {
      return fetchContacts.data
        ? (fetchContacts.data as any).ListbyUserContactFriend.items.filter(
            (item: ContactType) => !item._deleted
          )
        : [];
    }
    return rejectWithValue("fetch Contact error");
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<ContactType>) => {
      if (state.contacts.some((item) => item.id === action.payload.id))
        return state;
      return { ...state, contacts: [...state.contacts, action.payload] };
    },
    deleteUserContact: (state, action: PayloadAction<{ id: string }>) => {
      const filteredContacts = state.contacts.filter(
        (item) => item.id !== action.payload.id
      );
      state.contacts = filteredContacts;
      return state;
    },

    updateUserContact: (
      state,
      action: PayloadAction<{ id: string; version: string; request: string }>
    ) => {
      const userIndex = state.contacts.findIndex(
        (item) => item.id === action.payload.id
      );
      state.contacts[userIndex].userContact._version = action.payload.version;
      state.contacts[userIndex].userContact.requestStatus =
        action.payload.request;
      return state;
    },
    updateFriendStatus: (
      state,
      action: PayloadAction<{
        id: string;
        requestStatus: RequestStatusType;
        version: string;
        userContact?: ContactType["userContact"];
      }>
    ) => {
      const contactIndex = state.contacts.findIndex(
        (item) => item.id === action.payload.id
      );
      state.contacts[contactIndex].requestStatus = action.payload.requestStatus;
      state.contacts[contactIndex]._version = action.payload.version;
      if (action.payload.userContact)
        state.contacts[contactIndex].userContact = action.payload.userContact;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactList.fulfilled, (state, action) => {
        return { ...state, contacts: action.payload };
      })
      .addCase(getContactList.rejected, (state, action) => {
        console.log(action.error);
        if (action.payload === "string")
          return { ...state, error: action.payload };
        else return { ...state, error: action.error };
      })
      .addCase(getContactList.pending, (state, action) => {
        return { ...state, status: "fetching" };
      });
    /*       .addDefaultCase((state, action) => {
        return {
          contacts: [],
          status: "idle",
          error: null,
        };
      }); */
  },
});

export const {
  addFriendRequest,
  updateFriendStatus,
  updateUserContact,
  deleteUserContact,
} = contactSlice.actions;
