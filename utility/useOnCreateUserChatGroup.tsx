import { useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onCreateUserChatGroup } from "../src/graphql/subscriptions";
import { ChatGroupType } from "../src/screens/ChatsList/ChatsListScreen";

type ChatGroup = ChatGroupType["Chatgroup"];

export const useOnCreateChatGroup = (
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
          console.log(userAuth.attributes.sub);
          if (
            value.data.onCreateUserChatGroup.user.id !== userAuth.attributes.sub
          ) {
            value.data.onCreateUserChatGroup.Chatgroup.users = {
              items: [{ user: value.data.onCreateUserChatGroup.user }],
            };
            setChatGroupData((chatGroup: any) => {
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
