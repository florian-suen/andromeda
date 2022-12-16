import { useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onCreateUserChatGroup } from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useOnCreateUserChatGroup = (
  userAuth: any,
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
          if (
            value.data.onCreateUserChatGroup.user.id !==
            "5a9c4044-b837-47ff-b129-d2c1d85b2be3"
          ) {
            value.data.onCreateUserChatGroup.Chatgroup.users = {
              items: [{ user: value.data.onCreateUserChatGroup.user }],
            };
            setChatGroupData((chatGroup: any) => {
              if (!chatGroup) return chatGroup;
              chatGroup.unshift(value.data.onCreateUserChatGroup);
              return [...(chatGroup || {})];
            });
          }
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("Unsubscribing OnCreate Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, []);
};
