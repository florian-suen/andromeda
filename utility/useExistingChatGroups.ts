import { API, graphqlOperation } from "aws-amplify";

import { ChatGroupList } from "../src/screens/ChatsList/queries";

export const useExistingChatGroups = async (
  friendID: string,
  currentUserID: string
) => {
  const existingChatGroups = await API.graphql(
    graphqlOperation(ChatGroupList, {
      id: currentUserID,
    })
  );

  const chatGroupItems =
    "data" in existingChatGroups
      ? existingChatGroups.data.getUser.ChatGroups.items
      : [];

  const chatGroups = chatGroupItems.find((v: any) => {
    if (!v.Chatgroup) return false;
    return v.Chatgroup.users.items.some((u: any) => u.user.id === friendID);
  });

  return chatGroups;
};
