import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";

import { listbyUserContactFriend } from "./queries";

type RequestStatusType = "ACCEPTED" | "BLOCKED" | "REQUESTED" | "DECLINED";
export interface ContactType {
  sender: boolean;
  requestStatus: string;
  _version: string;
  _deleted: string;
  id: string;
  userContact: { id: string; _version: string };
  friend: {
    inviteId: string;
    image: string;
    username: string;
    id: string;
    status: string;
    _deleted: string;
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
      return { ...state, contacts: [...state.contacts, action.payload] };
    },
    updateFriendStatus: (
      state,
      action: PayloadAction<{
        id: string;
        requestStatus: RequestStatusType;
        version: string;
      }>
    ) => {
      const contactIndex = state.contacts.findIndex(
        (item) => item.id === action.payload.id
      );
      state.contacts[contactIndex].requestStatus = action.payload.requestStatus;
      state.contacts[contactIndex]._version = action.payload.version;
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

export const { addFriendRequest, updateFriendStatus } = contactSlice.actions;
