import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { UserBlogsType } from "../../screens/BlogScreen";
import { Storage } from "aws-amplify";
import { listbyUserContactFriend } from "./queries";
import { Image } from "react-native";
import { ContactState, ContactType, RequestStatusType } from "./types";

const initialState: ContactState = {
  contacts: [],
  blogs: [],
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
      const returnData: ContactType[] = fetchContacts.data
        ? (fetchContacts.data as any).ListbyUserContactFriend.items.filter(
            (item: ContactType) => !item._deleted
          )
        : [];

      let blogArray: UserBlogsType[] = [];
      for (let i = 0; i < returnData.length; i += 1) {
        const friend = returnData[i].friend;
        const blogList =
          friend.Blog?.items &&
          friend.Blog.items.length &&
          friend.Blog.items.map((item) => {
            return {
              name: friend.username,
              image: friend.image,
              blog: item,
            };
          });

        blogArray = [...blogArray, ...(blogList || [])];
      }

      for (let i = 0; i < blogArray.length; i += 1) {
        if (
          blogArray[i].blog.Media.items &&
          blogArray[i].blog.Media.items.length
        ) {
          const uriMedia = await Promise.all(
            blogArray[i].blog.Media.items.map((item) =>
              Storage.get(item.storageKey).then((uri) => {
                return Image.prefetch(uri).then((completed) => {
                  return {
                    ...item,
                    uri,
                  };
                });
              })
            )
          );

          blogArray[i].blog.Media.items = uriMedia;
        }
      }

      return { contacts: returnData, blogs: blogArray };
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
        return {
          ...state,
          blogs: action.payload.blogs,
          contacts: action.payload.contacts,
        };
      })
      .addCase(getContactList.rejected, (state, action) => {
        console.log("current User Error", action.error);
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
