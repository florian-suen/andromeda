import { SerializedError } from "@reduxjs/toolkit";

export type ChatGroupType = {
  Chatgroup: {
    LastMessage: { message: string; id: string; createdAt: string };
    id: string;
    _deleted: null | boolean;
    name: string;
    image: string;
    leaderID: string | null;
    _version: string;
    users: {
      items: {
        _deleted: boolean | null;
        id: string;
        _version: string;
        user: { id: string; image: string | null; username: string };
        Chatgroup?: {
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
    image: string;
    username: string;
  };
};

export type AddChatgroupPayload = {
  data: true;
};
export type ChatgroupState = {
  chatGroup: ChatGroupType[] | [ChatGroupType];
  status: "idle" | "fetching";
  error: string | null | SerializedError;
};
