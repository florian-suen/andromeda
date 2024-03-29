import { useAppSelector } from "./useReduxHooks";
import { API, graphqlOperation } from "aws-amplify";

import { ChatGroupList } from "../src/screens/ChatsList/queries";
import { ChatGroupType } from "../src/redux/chatGroup/chatGroupSlice";

export const useExistingChatGroups = async (
  friendID: string,
  currentUserID: string,
  chatGroupList: ChatGroupType[]
) => {
  /*    const existingChatGroups = await API.graphql(
    graphqlOperation(ChatGroupList, {
      id: currentUserID,
    })
  );
  const chatGroupItems =
    "data" in existingChatGroups
      ? existingChatGroups.data.getUser.ChatGroups.items
      : [];
 */
  const chatGroups = chatGroupList.find((v: any) => {
    if (!v.Chatgroup) return false;
    return v.Chatgroup.users.items.some((u: any) => u.user.id === friendID);
  });

  return chatGroups;
};
