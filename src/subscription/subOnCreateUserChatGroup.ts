import { useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onCreateUserChatGroup } from "../graphql/subscriptions";
import { AppDispatch } from "../redux/store";
import { updateUserChatGroup } from "../redux/chatGroup/chatGroupSlice";
//Note1
export const subOnCreateUserChatGroup = (
  userId: string,
  dispatch: AppDispatch
) => {
  useEffect(() => {
    const onCreateChatGrp = API.graphql(
      graphqlOperation(onCreateUserChatGroup, {
        filter: { userID: { eq: userId } },
      })
    );
    const chatGrpSubscription =
      "subscribe" in onCreateChatGrp &&
      onCreateChatGrp.subscribe({
        next: ({ value }: any) => {
          value.data.onCreateUserChatGroup.Chatgroup.users = {
            items: [
              {
                user: value.data.onCreateUserChatGroup.user,
                userID: value.data.onCreateUserChatGroup.userID,
              },
            ],
          };
          dispatch(updateUserChatGroup(value.data.onCreateUserChatGroup));
        },
        error: (err) => console.log(`onCreateUserChatGroup error: ${err}`),
      });

    return () => {
      console.log("Unsubscribing OnCreate Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, []);
};
