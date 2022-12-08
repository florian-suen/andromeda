import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateUserChatGroup } from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useOnCreateChatGroup = (
  chatGroupData: ChatGroup,
  setChatGroupData: React.Dispatch<React.SetStateAction<any>>
) => {
  useEffect(() => {
    const onCreateChatGrp = API.graphql(
      graphqlOperation(onCreateUserChatGroup)
    );

    const chatGrpSubscription =
      "subscribe" in onCreateChatGrp &&
      onCreateChatGrp.subscribe({
        next: ({ value }: any) => {
          console.log(value.data.onCreateUserChatGroup.Chatgroup);

          setChatGroupData((chatGroup: any) => {
            return [
              ...(chatGroup || {}),
              value.data.onCreateChatGroup.Chatgroup,
            ];
          });
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("Unsubscribing OnCreate Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, []);
};
