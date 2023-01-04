import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listMessagesByChatGroup } from "../../graphql/queries";

export interface MessageType {
  id: string;
  createdAt: string;
  message: string;
  userID: string;
  chatgroupID: string;
  updatedAt: string;
  _version: string;
  _deleted: string;
  _lastChangedAt: string;
}

export interface MessageState {
  messages: { message: MessageType[]; chatGroupId: string }[] | [];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}

const initialState: MessageState = {
  messages: [],
  status: "idle",
  error: null,
};

export const getMessageList = createAsyncThunk(
  "messageList/fetchMessage",
  async (chatGroupId: string, { rejectWithValue }) => {
    const fetchMessage = await API.graphql(
      graphqlOperation(listMessagesByChatGroup, {
        chatgroupID: chatGroupId,
        sortDirection: "DESC",
      })
    );

    if ("data" in fetchMessage)
      return fetchMessage.data
        ? {
            chatGroupId,
            messages: (fetchMessage.data as any).listMessagesByChatGroup.items,
          }
        : rejectWithValue("fetch Message error: ChatgroupID not found");

    return rejectWithValue("fetch Message error");
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessageList.fulfilled, (state, action) => {
        return {
          ...state,
          messages: [...state.messages, { ...action.payload }],
        };
      })
      .addCase(getMessageList.rejected, (state, action) => {
        if (action.payload === "string")
          return { ...state, error: action.payload };
        else return { ...state, error: action.error };
      })
      .addCase(getMessageList.pending, (state, action) => {
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
