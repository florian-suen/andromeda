import { createContext } from "react";
import { GroupChatContext } from "./types";

export const UserContext = createContext<GroupChatContext>(
  {} as GroupChatContext
);
