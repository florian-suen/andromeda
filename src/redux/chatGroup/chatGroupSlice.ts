import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { GetUser } from "../../screens/ChatsList/queries";

export const getChatGroup = createAsyncThunk(
  "posts/getPosts",

  async (
    arg,
    { dispatch, getState, extra, requestId, signal, rejectWithValue }
  ) => {
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
      for (let x = 0; x < filteredChatGroup.length; x += 1) {
        let filterUser;
        if (filteredChatGroup[x].Chatgroup?.users) {
          filterUser = filteredChatGroup[x].Chatgroup?.users?.items.filter(
            (v: any) => v.user.id !== userAuth.attributes.sub
          );
        }
        filteredChatGroup[x].Chatgroup.users.items = filterUser;
      }

      setChatGroup(filteredChatGroup);
    }
  }
);

const initialState = {
  chatGroup: null,
};

const chatGroup = createSlice({
  name: "chatgroup",
  initialState,
  reducers: {
    addChatGroup: (state: RootState) => {},
    removeChatGroup: (state: RootState) => {},
  },
  extraReducers: {
    [getChatGroup.pending]: (state, action) => {},
    [getChatGroup.fulfilled]: (state, { payload, meta }) => {},
    [getChatGroup.rejected]: (state, action) => {},
  },
});
