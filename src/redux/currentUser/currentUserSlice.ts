import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "./queries";
import { Media } from "../messages/messageSlice";
import { UserBlogsType } from "../../screens/BlogScreen";
import { Image } from "react-native";
import { Storage } from "aws-amplify";
export interface CurrentUserType {
  inviteId: string;
  image: string;
  username: string;
  id: string;
  status: string;
  _deleted: string;
  Blog: {
    items: {
      userID: string;
      createdAt: string;
      id: string;
      message: string;
      Media: { items: Media[] };
    }[];
  };
}

export interface ContactState {
  currentUser: CurrentUserType | null;
  blog: UserBlogsType[] | [];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}

const initialState: ContactState = {
  currentUser: null,
  blog: [],
  status: "idle",
  error: null,
};

export const getCurrentUser = createAsyncThunk(
  "currentUser/fetchCurrentUser",
  async (userId: string, { rejectWithValue }) => {
    const fetchCurrentUser = await API.graphql(
      graphqlOperation(getUser, {
        id: userId,
      })
    );

    if ("data" in fetchCurrentUser) {
      const returnData: CurrentUserType = fetchCurrentUser.data
        ? (fetchCurrentUser.data as any).getUser
        : null;

      const blogs =
        returnData.Blog?.items && returnData.Blog.items.length
          ? returnData.Blog.items.map((item) => {
              return {
                name: returnData.username,
                image: returnData.image,
                blog: item,
              };
            })
          : [];

      for (let i = 0; i < blogs.length; i += 1) {
        if (blogs[i].blog.Media.items && blogs[i].blog.Media.items.length) {
          const uriMedia = await Promise.all(
            blogs[i].blog.Media.items.map((item) =>
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

          blogs[i].blog.Media.items = uriMedia;
        }
      }

      return { currentUser: returnData, blog: blogs };
    }
    return rejectWithValue("fetch Current User error");
  }
);

export const currentUserSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateUserBlogOnCreateMedia: (
      state,
      action: PayloadAction<{ blogId: string; newMedia: Media }>
    ) => {
      state.currentUser?.Blog.items.findIndex(
        (item) => item.id === action.payload.blogId
      );

      const stateBlogIndex = state.currentUser?.Blog.items.findIndex(
        (item) => item.id === action.payload.blogId
      )!;

      const currentMedia =
        state.currentUser!.Blog.items[stateBlogIndex].Media.items;
      currentMedia.push(action.payload.newMedia);
      return state;
    },
    updateUserOnCreateBlog: (
      state,
      action: PayloadAction<{ blog: CurrentUserType["Blog"]["items"][0] }>
    ) => {
      if (state.currentUser?.Blog?.items) {
        state.currentUser.Blog.items.push(action.payload.blog);
        return state;
      }

      state.currentUser!.Blog.items = [action.payload.blog];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        return {
          ...state,
          currentUser: action.payload.currentUser,
          blog: action.payload.blog,
        };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log("error CurrentUser", action.error);
        if (action.payload === "string")
          return { ...state, error: action.payload };
        else return { ...state, error: action.error };
      })
      .addCase(getCurrentUser.pending, (state, action) => {
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

export const { updateUserOnCreateBlog, updateUserBlogOnCreateMedia } =
  currentUserSlice.actions;
