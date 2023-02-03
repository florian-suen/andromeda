import { View, Text, Image, Button } from "react-native";
import {
  ContactType,
  updateFriendStatus,
} from "../../redux/contactList/contactListSlice";
import { API, graphqlOperation } from "aws-amplify";
import { updateUserContact } from "../../screens/AddFriend/queries";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { Dispatch } from "./Contacts";

export const BlockedComponent = ({
  requestUser,
}: {
  requestUser: ContactType;
}) => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Image
        style={{ height: 200, width: 200 }}
        source={{ uri: requestUser.friend.image }}
      />
      <Text>{requestUser.friend.username}</Text>
      <Button
        title="Unblock"
        onPress={() => {
          unBlockFriendHandler(requestUser, dispatch);
        }}
      />
    </View>
  );
};

const unBlockFriendHandler = async (
  userContact: ContactType,
  dispatch: Dispatch
) => {
  const requestStatus =
    userContact.userContact.requestStatus === "ACCEPTED"
      ? "ACCEPTED"
      : "REQUESTED";

  const updateContact = await API.graphql(
    graphqlOperation(updateUserContact, {
      input: {
        id: userContact.id,
        requestStatus: requestStatus,
        _version: userContact._version,
      },
    })
  );

  dispatch(
    updateFriendStatus({
      id: userContact.id,
      requestStatus: requestStatus,
      version: userContact._version + 1,
    })
  );
};
