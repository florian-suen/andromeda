import { View, Text, Image, Button } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUserContact } from "../../screens/AddFriend/queries";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { Dispatch } from "./Contacts";
import { ContactType } from "../../redux/contactList/types";

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
  const updateContact = await API.graphql(
    graphqlOperation(deleteUserContact, {
      input: {
        id: userContact.id,
        _version: userContact._version,
      },
    })
  );

  API.graphql(
    graphqlOperation(deleteUserContact, {
      input: {
        id: userContact.userContact.id,
        _version: userContact.userContact._version,
      },
    })
  );
};
