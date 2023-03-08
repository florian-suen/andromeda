import { SerializedError } from "@reduxjs/toolkit";
import { UserBlogsType } from "../../screens/BlogScreen";
import { Media } from "../messages/types";

export type RequestStatusType = "ACCEPTED" | "BLOCKED" | "REQUESTED";
export interface ContactType {
  sender: boolean;
  requestStatus: string;
  _version: string;
  _deleted: string;
  friendID: string;
  id: string;
  userContact: { id: string; _version: string; requestStatus: string };
  friend: {
    inviteId: string;
    image: string;
    username: string;
    id: string;
    status: string;
    _deleted: string;
    Blog: {
      items: {
        createdAt: string;
        id: string;
        message: string;
        Media: { items: Media[] };
      }[];
    };
  };
}

export interface ContactState {
  contacts: ContactType[] | [];
  blogs: UserBlogsType[] | [];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
}
