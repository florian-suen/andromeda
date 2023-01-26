import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

//Change inviteID post production
export interface ContactType {
  inviteId: string | undefined;
  image: string;
  username: string;
  id: string;
  status: string;
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
  async (_, { rejectWithValue }) => {
    const fetchContacts = await API.graphql(graphqlOperation(listUsers));

    if ("data" in fetchContacts)
      return fetchContacts.data
        ? (fetchContacts.data as any).listUsers.items
        : [];

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
