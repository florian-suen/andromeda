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
  blogID: string;
  duration: string;
  width: string;
  height: string;
  userID: string;
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
  status: "sending" | "complete" | "error";
  id: string | null;
  createdAt: string;
  message: string;
  userID: string | null;
  chatgroupID: string;
  updatedAt: string | null;
  _version: string | null;
  _deleted: string | null;
  _lastChangedAt: string | null;

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

      currentMedia.push(action.payload.newMedia);

      state.messages[stateMessageIndex].message[0].Media.items = currentMedia;
      return state;
    },

    addMessage: (
      state,
      action: PayloadAction<{
        chatGroupId: string;
        newMessage: MessageType | string;
        createdAt?: string;
      }>
    ) => {
      const stateMessageIndex = state.messages.findIndex((item) => {
        return item.chatGroupId === action.payload.chatGroupId;
      });

      if (typeof action.payload.newMessage === "string") {
        state.messages[stateMessageIndex].message.unshift({
          message: action.payload.newMessage,
          status: "sending",
          _deleted: null,
          createdAt: action.payload.createdAt!,
          id: null,
          Media: { items: [] },
          updatedAt: null,
          userID: null,
          _lastChangedAt: null,
          _version: null,
          Attachments: { items: [] },
          chatgroupID: action.payload.chatGroupId,
        });
        return state;
      }

      state.messages[stateMessageIndex].message.find((item) =>
        console.log(item.createdAt)
      );
      action.payload.newMessage.status = "complete";

      const messasgeExist = state.messages[stateMessageIndex].message.find(
        (item) =>
          item.createdAt ===
          (action.payload.newMessage as MessageType).createdAt
      );

      messasgeExist &&
        Object.assign(
          state.messages[stateMessageIndex].message.find(
            (item) =>
              item.createdAt ===
              (action.payload.newMessage as MessageType).createdAt
          ) as MessageType,
          action.payload.newMessage
        );

      !messasgeExist &&
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
