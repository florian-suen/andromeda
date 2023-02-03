import {
  ContactType,
  RequestStatusType,
  updateUserContact,
} from "./../redux/contactList/contactListSlice";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import {
  addFriendRequest,
  updateFriendStatus,
} from "../redux/contactList/contactListSlice";
import { AppDispatch } from "../redux/store";
import {
  onCreateUserContact,
  onUpdateUserContact,
} from "./subscriptionQueries";

export const subonUpdateUserContact = (
  userId: string,
  dispatch: AppDispatch
) => {
  useEffect(() => {
    const onUpdateContact = API.graphql(
      graphqlOperation(onUpdateUserContact, {
        filter: { userID: { eq: userId } },
      })
    );

    const onUpdateContactVersion = API.graphql(
      graphqlOperation(onUpdateUserContact, {
        filter: { friendID: { eq: userId } },
      })
    );

    const onUpdateContactVersionSubscription =
      "subscribe" in onUpdateContactVersion &&
      onUpdateContactVersion.subscribe({
        next: ({
          value,
        }: {
          value: { data: { onUpdateUserContact: ContactType } };
        }) => {
          console.log("hi");
          return dispatch(
            updateUserContact({
              id: value.data.onUpdateUserContact.userContact.id,
              request: value.data.onUpdateUserContact.requestStatus,
              version: value.data.onUpdateUserContact._version,
            })
          );
        },
        error: (err) =>
          console.log(` onUpdateContactVersion Subscription Error: ${err}`),
      });

    const onUpdateContactSubscription =
      "subscribe" in onUpdateContact &&
      onUpdateContact.subscribe({
        next: ({
          value,
        }: {
          value: { data: { onUpdateUserContact: ContactType } };
        }) => {
          console.log(value.data.onUpdateUserContact);
          if (value.data.onUpdateUserContact.friendID === userId) {
            return dispatch(
              updateUserContact({
                id: value.data.onUpdateUserContact.userContact.id,
                request: value.data.onUpdateUserContact.requestStatus,
                version: value.data.onUpdateUserContact._version,
              })
            );
          }
          dispatch(
            updateFriendStatus({
              id: value.data.onUpdateUserContact.id,
              requestStatus: value.data.onUpdateUserContact
                .requestStatus as RequestStatusType,
              version: value.data.onUpdateUserContact._version,
              userContact: value.data.onUpdateUserContact.userContact,
            })
          );
        },
        error: (err) =>
          console.log(` onUpdateContact Subscription Error: ${err}`),
      });

    return () => {
      console.log("Unsubscribing User Contacts");
      onUpdateContactSubscription && onUpdateContactSubscription.unsubscribe;
      onUpdateContactVersionSubscription &&
        onUpdateContactVersionSubscription.unsubscribe;
    };
  }, []);
};

//A problem I thought about is if they add each other during the same time? A check may be needed to see if the user and friend exists even with the subscription.

export const subOnCreateUserContact = (
  userId: string,
  dispatch: AppDispatch
) => {
  useEffect(() => {
    const onCreateContact = API.graphql(
      graphqlOperation(onCreateUserContact, {
        filter: { userID: { eq: userId } },
      })
    );
    const onCreateContactSubscription =
      "subscribe" in onCreateContact &&
      onCreateContact.subscribe({
        next: ({ value }: any) => {
          dispatch(
            addFriendRequest(value.data.onCreateUserContact as ContactType)
          );
        },
        error: (err) =>
          console.log(`onCreateUserContact Subscription Error:${err}`),
      });

    return () => {
      console.log("Unsubscribing User Contacts");
      onCreateContactSubscription && onCreateContactSubscription.unsubscribe;
    };
  }, []);
};
