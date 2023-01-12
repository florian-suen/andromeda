import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { GetUser } from "../../screens/ChatsList/queries";

export interface ChatGroupType {
  Chatgroup: {
    LastMessage: { message: string; id: string; createdAt: string };
    id: string;
    name: string;
    image: string;
    leaderID: string;
    _version: string;
    users: {
      items: {
        _deleted: boolean | null;
        user: { id: string; image: string | null; username: string };
        Chatgroup: {
          id: string;
          image: string;
          name: string;
          LastMessage: { message: string; id: string; createdAt: string };
        };
      }[];
    };
  };
  user: {
    Chatgroup: {
      LastMessage: { message: string; id: string; createdAt: string };
    };
    id: string;
    image: string | null;
    username: string;
  };
}

export interface AddChatgroupPayload {
  data: true;
}
export interface ChatgroupState {
  chatGroup: ChatGroupType[] | [ChatGroupType];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}

export const getChatGroup = createAsyncThunk(
  "chatGroup/fetchGroup",
  async (userAuth: any, { rejectWithValue }) => {
    const chatGroupResp = await API.graphql(
      graphqlOperation(GetUser, { id: userAuth.attributes.sub })
    );

    const chatgroupItems =
      "data" in chatGroupResp && chatGroupResp.data.getUser.ChatGroups
        ? chatGroupResp.data.getUser.ChatGroups.items
        : null;

    if (chatgroupItems[0].Chatgroup) {
      const filteredChatGroup = chatgroupItems.filter(
        (value: any) => !value._deleted
      );

      return filteredChatGroup;
    } else if (chatgroupItems === null)
      return rejectWithValue("fetch Chatgroup error");
  }
);

const initialState: ChatgroupState = {
  chatGroup: [],
  status: "idle",
  error: null,
};

export const chatGroupSlice = createSlice({
  name: "chatGroup",
  initialState,
  reducers: {
    reorderChatGroup: (
      state,
      action: PayloadAction<{
        id: string;
        lastMessage: { message: string; id: string; createdAt: string };
        version: string;
      }>
    ) => {
      state.chatGroup.sort((a: ChatGroupType, b: ChatGroupType) => {
        if (a.Chatgroup.id === action.payload.id) return -1;
        return 0;
      });
      if (state.chatGroup.length) {
        state.chatGroup[0].Chatgroup.LastMessage = action.payload.lastMessage;
        state.chatGroup[0].Chatgroup._version = action.payload.version;
      }
      return state;
    },
    addUserChatGroup: (
      state,
      action: PayloadAction<{
        chatGroupId: string;
        chatGroup: ChatGroupType;
      }>
    ) => {
      const stateIndex = state.chatGroup.findIndex(
        (item) => item.Chatgroup.id === action.payload.chatGroupId
      );
      state.chatGroup[stateIndex].Chatgroup.users.items =
        action.payload.chatGroup.Chatgroup.users.items;

      return state;
    },
    removeUserChatGroup: (
      state,
      action: PayloadAction<{ chatGroupId: string; userId: string }>
    ) => {
      const stateIndex = state.chatGroup.findIndex(
        (item) => item.Chatgroup.id === action.payload.chatGroupId
      );
      const filterUsers = state.chatGroup[
        stateIndex
      ].Chatgroup.users.items.filter((item: any) => {
        return item.user.id !== action.payload.userId;
      });
      state.chatGroup[stateIndex].Chatgroup.users.items = filterUsers;

      return state;
    },
    updateUserChatGroup: (
      state: ChatgroupState,
      action: PayloadAction<ChatGroupType>
    ) => {
      let index: number = 0;
      //note 1 why 24 when only 15 and also when creating new group the main user not there!
      const chatGroupExists = state.chatGroup.some((item, itemIndex) => {
        if (item.Chatgroup.id === action.payload.Chatgroup.id) {
          index = itemIndex;
          return true;
        }
        return false;
      });

      const userExists = state.chatGroup[index].Chatgroup.users.items.some(
        (item) => {
          if (item.user.id === action.payload.user.id) {
            return item._deleted === null;
          }
          return false;
        }
      );

      if (!state.chatGroup.length) {
        state.chatGroup = [action.payload];
        return state;
      } else if (chatGroupExists) {
        if (!userExists) {
          state.chatGroup[index].Chatgroup.users.items = state.chatGroup[
            index
          ].Chatgroup.users.items.concat(action.payload.Chatgroup.users.items);
        }
        return state;
      }
      state.chatGroup.unshift(action.payload);
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChatGroup.fulfilled, (state, action) => {
        return { chatGroup: action.payload, status: "idle", error: null };
      })
      .addCase(getChatGroup.rejected, (state, action) => {
        if (action.payload === "string")
          return { chatGroup: [], status: "idle", error: action.payload };
        else return { chatGroup: [], status: "idle", error: action.error };
      })
      .addCase(getChatGroup.pending, (state, action) => {
        return { chatGroup: [], status: "fetching", error: null };
      });
    /*      .addDefaultCase((state, action) => {
        
        return {
          chatGroup: [],
          status: "idle",
          error: null,
        };
      }); */
  },
});

export const {
  addUserChatGroup,
  removeUserChatGroup,
  reorderChatGroup,
  updateUserChatGroup,
} = chatGroupSlice.actions;
