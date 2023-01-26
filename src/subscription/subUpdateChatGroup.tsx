import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatGroup } from "../graphql/subscriptions";
import { ChatGroupType } from "../redux/chatGroup/chatGroupSlice";
import { AppDispatch } from "../redux/store";
import { reorderChatGroup } from "../redux/chatGroup/chatGroupSlice";

type ChatGroup = ChatGroupType["Chatgroup"];

export const subUpdateChatGroup = (
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
                version: value.data.onUpdateChatGroup._version,
              })
            );
        },
        error: (err) =>
          console.log(`onUpdateChatGroup subscription error ${err}`),
      });

    return () => {
      console.log("Unsubscribing Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, [chatGroupId]);
};
