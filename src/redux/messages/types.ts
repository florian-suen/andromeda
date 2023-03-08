import { SerializedError } from "@reduxjs/toolkit";

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
  size: string;
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
