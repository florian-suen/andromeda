import { View, Text, Image, Button } from "react-native";
import {
  ContactType,
  updateFriendStatus,
} from "../../redux/contactList/contactListSlice";
import { API, graphqlOperation } from "aws-amplify";
import { updateUserContact } from "../../screens/AddFriend/queries";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { Dispatch } from "./Contacts";

export const RequestComponent = ({
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
        title="Accept"
        onPress={() => addFriendHandler(requestUser, dispatch)}
      />

      <Button title="Decline" onPress={() => {}} />
    </View>
  );
};

const addFriendHandler = async (
  userContact: ContactType,
  dispatch: Dispatch
) => {
  const updateContact = await API.graphql(
    graphqlOperation(updateUserContact, {
      input: {
        id: userContact.id,
        requestStatus: "ACCEPTED",
        _version: userContact._version,
      },
    })
  );

  dispatch(
    updateFriendStatus({
      id: userContact.id,
      requestStatus: "ACCEPTED",
      version: userContact._version,
    })
  );

  API.graphql(
    graphqlOperation(updateUserContact, {
      input: {
        id: userContact.userContact.id,
        requestStatus: "ACCEPTED",
        _version: userContact.userContact._version,
      },
    })
  );
};
