import { API, graphqlOperation } from "aws-amplify";
import { onDeleteUserChatGroup } from "../graphql/subscriptions";
import { ChatGroupType } from "../redux/chatGroup/chatGroupSlice";
import { AppDispatch } from "../redux/store";
import { removeUserChatGroup } from "../redux/chatGroup/chatGroupSlice";

type ChatGroup = ChatGroupType["Chatgroup"];

export const subOnDeleteUserChatGroup = (
  chatGroupData: ChatGroup,
  dispatch: AppDispatch
) => {
  const onDeleteUserChatGrp = API.graphql(
    graphqlOperation(onDeleteUserChatGroup, {
      filter: { chatgroupID: { eq: chatGroupData.id } },
    })
  );
  const onDeleteUserChatGrpSubscription =
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
      error: (err) => console.log(`onDeleteUserChatGroup Error ${err}`),
    });

  return () => {
    console.log("Unsubscribing deleteUserChatGroup");
    onDeleteUserChatGrpSubscription &&
      onDeleteUserChatGrpSubscription.unsubscribe;
  };
};
