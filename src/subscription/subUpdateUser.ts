import { graphqlOperation, API } from "aws-amplify";
import { onUpdateUser } from "../graphql/subscriptions";
import { updateStatus } from "../redux/contactList/contactListSlice";

import { AppDispatch } from "../redux/store";

export const subOnupdateUser = (
  currentUserId: string,
  dispatch: AppDispatch
) => {
  const onUpdateCurrentUser = API.graphql(
    graphqlOperation(onUpdateUser, {
      filter: { id: { eq: currentUserId } },
    })
  );
  const onUpdateCurrentUserSubscription =
    "subscribe" in onUpdateCurrentUser &&
    onUpdateCurrentUser.subscribe({
      next: ({ value }: any) => {
        dispatch(
          updateStatus({
            _version: value.data.onUpdateUser._version,
            status: value.data.onUpdateUser.status,
            id: value.data.onUpdateUser.id,
          })
        );
      },
      error: (err) => console.log(`onUpdateCurrentUserStatus Error ${err}`),
    });

  return () => {
    console.log("Unsubscribing onUpdateCurrentUserStatus");
    onUpdateCurrentUserSubscription &&
      onUpdateCurrentUserSubscription.unsubscribe();
  };
};
