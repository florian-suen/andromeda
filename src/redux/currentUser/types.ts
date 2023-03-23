import { SerializedError } from "@reduxjs/toolkit";
import { UserBlogsType } from "../../screens/BlogScreen";
import { Media } from "../messages/types";

export interface CurrentUserType {
  inviteId: string;
  image: string;
  username: string;
  id: string;
  _version: string;
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
