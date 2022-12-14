import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatGroup } from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useUpdateChatGroup = (
  chatGroupData: ChatGroup,
  setChatGroupData: React.Dispatch<React.SetStateAction<ChatGroup>>,
  chatGroupId: string,
  setReOrder?: (chatGroupId: string) => void
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
          setReOrder && setReOrder(value.data.onUpdateChatGroup.id);
          setChatGroupData((chatGroup: any) => {
            const newChatGroup = chatGroup || chatGroupData;

            return { ...(newChatGroup || {}), ...value.data.onUpdateChatGroup };
          });
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("Unsubscribing Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, [chatGroupId]);
};
