import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";

import { updateFriendStatus } from "../redux/contactList/contactListSlice";
import { AppDispatch } from "../redux/store";
import { onUpdateUserContact } from "./subscriptionQueries";

export const subonUpdateUserContact = (
  userId: string,
  dispatch: AppDispatch
) => {
  console.log("lol");
  useEffect(() => {
    const onUpdateContact = API.graphql(
      graphqlOperation(onUpdateUserContact, {
        filter: { userID: { eq: userId } },
      })
    );
    const onUpdateContactSubscription =
      "subscribe" in onUpdateContact &&
      onUpdateContact.subscribe({
        next: ({ value }: any) => {
          console.log(value);
          //value.data.onUpdateUserContact.sender &&
          dispatch(
            updateFriendStatus({
              id: value.data.onUpdateUserContact.id,
              requestStatus: value.data.onUpdateUserContact.requestStatus,
              version: value.data.onUpdateUserContact.requestStatus._version,
            })
          );
        },
        error: (err) => console.log(`onDeleteUserChatGroup Error ${err}`),
      });

    return () => {
      console.log("Unsubscribing User Contacts");
      onUpdateContactSubscription && onUpdateContactSubscription.unsubscribe;
    };
  }, []);
};
