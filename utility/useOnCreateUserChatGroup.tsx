import { useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onCreateUserChatGroup } from "../src/graphql/subscriptions";
import { AppDispatch } from "../src/redux/store";
import { updateUserChatGroup } from "../src/redux/chatGroup/chatGroupSlice";
export const useOnCreateUserChatGroup = (
  userAuth: any,
  navigation: any,
  dispatch: AppDispatch
) => {
  useEffect(() => {
    const onCreateChatGrp = API.graphql(
      graphqlOperation(onCreateUserChatGroup)
    );

    let timeout: NodeJS.Timeout;
    const chatGrpSubscription =
      "subscribe" in onCreateChatGrp &&
      onCreateChatGrp.subscribe({
        next: ({ value }: any) => {
          if (
            value.data.onCreateUserChatGroup.user.id !== userAuth.attributes.sub
          ) {
            value.data.onCreateUserChatGroup.Chatgroup.users = {
              items: [{ user: value.data.onCreateUserChatGroup.user }],
            };
            dispatch(updateUserChatGroup(value.data.onCreateUserChatGroup));
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
              navigation.navigate("GroupChat", {
                chatGroupId: value.data.onCreateUserChatGroup.Chatgroup.id,
                username: userAuth.attributes.email,
              });
            }, 0);
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
