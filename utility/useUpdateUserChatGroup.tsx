import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  onDeleteUserChatGroup,
  onCreateUserChatGroup,
} from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useOnDeleteUserChatGroup = (
  chatGroupData: ChatGroup,
  setChatGroupData: React.Dispatch<React.SetStateAction<ChatGroup>>
) => {
  const onDeleteUserChatGrp = API.graphql(
    graphqlOperation(onDeleteUserChatGroup, {
      filter: { chatgroupID: { eq: chatGroupData.id } },
    })
  );
  const userChatGrpSubscription =
    "subscribe" in onDeleteUserChatGrp &&
    onDeleteUserChatGrp.subscribe({
      next: ({ value }: any) => {
        setChatGroupData((chatGroup: any) => {
          const userFilter = chatGroup.users.items.filter((item: any) => {
            return item.user.id !== value.data.onDeleteUserChatGroup.userID;
          });
          chatGroup.users.items = userFilter;
          return {
            ...(chatGroup || {}),
          };
        });
      },
      error: (err) => console.log(err),
    });

  return () => {
    console.log("Unsubscribing deleteUserChatGroup");
    userChatGrpSubscription && userChatGrpSubscription.unsubscribe;
  };
};

export const useOnCreateUserChatGroup = (
  chatGroupData: ChatGroup,
  setChatGroupData: React.Dispatch<React.SetStateAction<ChatGroup>>
) => {
  const useOnCreateUserChatGroup = API.graphql(
    graphqlOperation(onCreateUserChatGroup, {
      filter: { chatgroupID: { eq: chatGroupData.id } },
    })
  );
  const userChatGrpSubscription =
    "subscribe" in useOnCreateUserChatGroup &&
    useOnCreateUserChatGroup.subscribe({
      next: ({ value }: any) => {
        setChatGroupData((chatGroup: any) => {
          const concatedChatGroup = chatGroup.users.items.concat(
            value.data.onCreateUserChatGroup
          );
          chatGroup.users.items = concatedChatGroup;
          return {
            ...(chatGroup || {}),
          };
        });
      },
      error: (err) => console.log(err),
    });

  return () => {
    console.log("Unsubscribing deleteUserChatGroup");
    userChatGrpSubscription && userChatGrpSubscription.unsubscribe;
  };
};