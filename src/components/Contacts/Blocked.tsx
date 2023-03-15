import { View, Text, Image } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUserContact } from "../../screens/AddFriend/queries";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { Dispatch } from "./Contacts";
import { ContactType } from "../../redux/contactList/types";
import { Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export const BlockedComponent = ({
  requestUser,
}: {
  requestUser: ContactType;
}) => {
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        padding: 5,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        style={{ height: 60, width: 60, borderRadius: 5, marginRight: 10 }}
        source={{ uri: requestUser.friend.image }}
      />
      <Text style={{ fontFamily: "Exo2", fontSize: 17, color: Colors.accent }}>
        {requestUser.friend.username}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Exo2",
            fontSize: 12,
            color: Colors.accent,
            marginRight: 20,
          }}
        >
          {dayjs(requestUser.updatedAt).fromNow(true)} ago
        </Text>
        <Button
          buttonColor={Colors.warning}
          compact
          style={{ borderRadius: 4, marginRight: 4 }}
          mode="contained"
          onPress={() => {
            unBlockFriendHandler(requestUser, dispatch);
          }}
        >
          Unblock
        </Button>
      </View>
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
