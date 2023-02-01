import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";

import { listbyUserContactFriend } from "./queries";

//Change inviteID post production
export interface ContactType {
  sender: boolean;
  requestStatus: string;
  _deleted: string;
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
        ? (fetchContacts.data as any).ListbyUserContactFriend.items
        : [];
    }
    return rejectWithValue("fetch Contact error");
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
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
