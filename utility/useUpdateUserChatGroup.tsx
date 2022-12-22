import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  onDeleteUserChatGroup,
  onCreateUserChatGroup,
} from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";
import { AppDispatch } from "../src/redux/store";
import {
  addUserChatGroup,
  removeUserChatGroup,
} from "../src/redux/chatGroup/chatGroupSlice";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useOnDeleteUserChatGroup = (
  chatGroupData: ChatGroup,
  dispatch: AppDispatch
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
        dispatch(
          removeUserChatGroup({
            chatGroupId: chatGroupData.id,
            userId: value.data.onDeleteUserChatGroup.userID,
          })
        );
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
  navigation: any,
  dispatch: AppDispatch
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
        dispatch(
          addUserChatGroup({
            chatGroupId: chatGroupData.id,
            chatGroup: value.data.onCreateUserChatGroup,
          })
        );
      },
      error: (err) => console.log(err),
    });

  return () => {
    console.log("Unsubscribing deleteUserChatGroup");
    userChatGrpSubscription && userChatGrpSubscription.unsubscribe;
  };
};
