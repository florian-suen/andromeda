import { updateMedia } from "./../../graphql/mutations";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listMessagesByChatGroup } from "../../components/GroupChatCompound/GroupChatCompoundQueries";

export type Media = {
  id: string;
  storageKey: string;
  type: string;
  messageID: string;
  chatgroupID: string;
  duration: string;
  width: string;
  height: string;
};

export type Attachments = {
  chatgroupID: string;
  createdAt: string;
  id: string;
  messageID: string;
  updatedAt: string;
  type: string;
  storageKey: string;
  name: string;
  _version: string;
  _lastChangedAt: string;
  _deleted: string;
};
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

  Media: {
    items: Media[];
  };

  Attachments: {
    items: Attachments[];
  };
}

export interface Message {
  message: MessageType[];
  chatGroupId: string;
}
export interface MessageState {
  messages: Message[] | [];
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
  async (chatGroupId: string | string[], { rejectWithValue }) => {
    if (Array.isArray(chatGroupId)) {
      return await Promise.all(
        chatGroupId.map(async (item) => {
          const message = await API.graphql(
            graphqlOperation(listMessagesByChatGroup, {
              chatgroupID: item,
              sortDirection: "DESC",
            })
          );

          if ("data" in message && message.data)
            return {
              chatGroupId: item,
              message: (message.data as any).listMessagesByChatGroup
                .items as MessageType[],
            };

          return null;
        })
      );
    }

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
            message: (fetchMessage.data as any).listMessagesByChatGroup.items,
          }
        : rejectWithValue("fetch Message error: ChatgroupID not found");

    return rejectWithValue("fetch Message error");
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateMessageAttachments: (
      state,
      action: PayloadAction<{ chatGroupId: string; newAttachment: Attachments }>
    ) => {
      const stateMessageIndex = state.messages.findIndex((item) => {
        return item.chatGroupId === action.payload.chatGroupId;
      });

      const currentAttachments =
        state.messages[stateMessageIndex].message[0].Attachments.items;

      state.messages[stateMessageIndex].message[0].Attachments.items = [
        ...currentAttachments,
        action.payload.newAttachment,
      ];
      return state;
    },

    updateMessageMedia: (
      state,
      action: PayloadAction<{ chatGroupId: string; newMedia: Media }>
    ) => {
      const stateMessageIndex = state.messages.findIndex((item) => {
        return item.chatGroupId === action.payload.chatGroupId;
      });

      const currentMedia =
        state.messages[stateMessageIndex].message[0].Media.items;

      state.messages[stateMessageIndex].message[0].Media.items = [
        ...currentMedia,
        action.payload.newMedia,
      ];
      return state;
    },

    addMessage: (
      state,
      action: PayloadAction<{ chatGroupId: string; newMessage: MessageType }>
    ) => {
      const stateMessageIndex = state.messages.findIndex((item) => {
        return item.chatGroupId === action.payload.chatGroupId;
      });
      state.messages[stateMessageIndex].message.unshift(
        action.payload.newMessage
      );
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessageList.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          const filterNulls: Message[] = action.payload.filter(
            (item): item is Message => item !== null
          );

          return {
            ...state,
            messages: [...state.messages, ...filterNulls],
          };
        }

        return {
          ...state,
          messages: [...state.messages, action.payload],
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

export const { addMessage, updateMessageAttachments, updateMessageMedia } =
  messageSlice.actions;
