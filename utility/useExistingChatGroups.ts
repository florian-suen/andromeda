import { createContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { ChatGroupList } from "../src/screens/ChatsList/queries";

export const useExistingChatGroups = async (userID: string, userAuth: any) => {
  const existingChatGroups = await API.graphql(
    graphqlOperation(ChatGroupList, {
      id: userAuth.attributes.sub,
    })
  );

  const chatGroupItems =
    "data" in existingChatGroups
      ? existingChatGroups.data?.getUser?.ChatGroups.items
      : [];

  const chatGroups = chatGroupItems.find((v: any) =>
    v.Chatgroup.users.items.some((u: any) => u.user.id === userID)
  );

  return chatGroups;
};
