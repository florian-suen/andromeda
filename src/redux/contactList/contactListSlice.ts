import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

export interface ContactType {
  image: string;
  username: string;
  id: string;
  status: string;
}

export interface ContactState {
  contacts: [ContactType] | [];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}

const initialState: ContactState = {
  contacts: [],
  status: "idle",
  error: null,
};

const getContactList = createAsyncThunk(
  "contactList/fetchContact",
  async (userAuth: any, { rejectWithValue }) => {
    const fetchContacts = API.graphql(graphqlOperation(listUsers));
    if ("data" in fetchContacts)
      return fetchContacts.data
        ? (fetchContacts.data as any).listUsers.items
        : [];

    rejectWithValue("fetch Contact error");
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getContactList.fulfilled, (state, action) => {
        return { contacts: action.payload, status: "idle", error: null };
      })
      .addCase(getContactList.rejected, (state, action) => {
        if (action.payload === "string")
          return { contacts: [], status: "idle", error: action.payload };
        else return { contacts: [], status: "idle", error: action.error };
      })
      .addCase(getContactList.pending, (state, action) => {
        return { contacts: [], status: "fetching", error: null };
      })
      .addDefaultCase((state, action) => {
        return {
          contacts: [],
          status: "idle",
          error: null,
        };
      });
  },
});
