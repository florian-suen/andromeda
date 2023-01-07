import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatGroup } from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";
import { AppDispatch } from "../src/redux/store";
import { reorderChatGroup } from "../src/redux/chatGroup/chatGroupSlice";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useUpdateChatGroup = (
  chatGroupData: ChatGroup,
  chatGroupId: string,
  dispatch: AppDispatch,
  reOrder?: boolean
) => {
  useEffect(() => {
    if (!chatGroupData) return;
    const onUpdateChatGrp = API.graphql(
      graphqlOperation(onUpdateChatGroup, {
        filter: { id: { eq: chatGroupData.id } },
      })
    );

    const chatGrpSubscription =
      "subscribe" in onUpdateChatGrp &&
      onUpdateChatGrp.subscribe({
        next: ({ value }: any) => {
          if (reOrder)
            return dispatch(
              reorderChatGroup({
                id: value.data.onUpdateChatGroup.id,
                lastMessage: value.data.onUpdateChatGroup.LastMessage,
              })
            );
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("Unsubscribing Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, [chatGroupId]);
};
