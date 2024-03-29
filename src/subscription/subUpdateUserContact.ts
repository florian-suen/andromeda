import {
  ContactType,
  deleteUserContact,
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
  onDeleteUserContact,
  onUpdateUserContact,
} from "./subscriptionQueries";

export const subOnDeleteUserContact = (
  userId: string,
  dispatch: AppDispatch
) => {
  useEffect(() => {
    const onDeleteContact = API.graphql(
      graphqlOperation(onDeleteUserContact, {
        filter: { userID: { eq: userId } },
      })
    );

    const onDeleteContactSubscription =
      "subscribe" in onDeleteContact &&
      onDeleteContact.subscribe({
        next: ({
          value,
        }: {
          value: { data: { onDeleteUserContact: ContactType } };
        }) => {
          return dispatch(
            deleteUserContact({
              id: value.data.onDeleteUserContact.id,
            })
          );
        },
        error: (err) =>
          console.log(` onUpdateContactVersion Subscription Error: ${err}`),
      });

    return () => {
      console.log("Unsubscribing User Contacts");
      onDeleteContactSubscription && onDeleteContactSubscription.unsubscribe;
    };
  }, []);
};

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
          console.log("updating");
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
