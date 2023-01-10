import { API, graphqlOperation } from "aws-amplify";

import { ChatGroupList } from "../screens/ChatsList/queries";

export const subExistingChatGroups = async (userID: string, userAuth: any) => {
  const existingChatGroups = await API.graphql(
    graphqlOperation(ChatGroupList, {
      id: userAuth.attributes.sub,
    })
  );

  const chatGroupItems =
    "data" in existingChatGroups
      ? existingChatGroups.data.getUser.ChatGroups.items
      : [];

  const chatGroups = chatGroupItems.find((v: any) => {
    if (!v.Chatgroup) return false;
    return v.Chatgroup.users.items.some((u: any) => u.user.id === userID);
  });

  return chatGroups;
};
