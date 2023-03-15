import { View, Text, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { updateFriendStatus } from "../../redux/contactList/contactListSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
  deleteUserContact,
  updateUserContact,
} from "../../screens/AddFriend/queries";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { Dispatch } from "./Contacts";
import { ContactType } from "../../redux/contactList/types";
import Colors from "../../constants/Colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export const RequestComponent = ({
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

      {requestUser.sender && (
        <Text
          style={{
            fontFamily: "Exo2",
            fontSize: 12,
            color: Colors.accent,
            marginLeft: 20,
          }}
        >
          {dayjs(requestUser.createdAt).fromNow(true)} ago
        </Text>
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {!requestUser.sender ? (
          <>
            <Button
              compact
              buttonColor={Colors.success}
              style={{ marginRight: 10, borderRadius: 3 }}
              mode="contained"
              onPress={() => addFriendHandler(requestUser, dispatch)}
            >
              Accept
            </Button>
            <Button
              style={{ marginRight: 5, borderRadius: 3 }}
              mode="contained"
              compact
              onPress={() => {
                deleteFriendHandler(requestUser, dispatch);
              }}
            >
              {requestUser.sender ? "Remove" : "Decline"}
            </Button>
            <Button
              textColor={Colors.danger}
              compact
              onPress={() => {
                Alert.alert(
                  "Blocking User",
                  `Are you sure that you want to block ${requestUser.friend.username}?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Block",
                      style: "destructive",
                      onPress: () => blockFriendHandler(requestUser, dispatch),
                    },
                  ]
                );
              }}
            >
              Block
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ marginRight: 10, borderRadius: 3 }}
              mode="contained"
              compact
              onPress={() => {
                deleteFriendHandler(requestUser, dispatch);
              }}
            >
              {requestUser.sender ? "Remove" : "Decline"}
            </Button>
            <Button
              textColor={Colors.danger}
              compact
              mode="contained"
              onPress={() => {
                Alert.alert(
                  "Blocking User",
                  `Are you sure that you want to block ${requestUser.friend.username}?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Block",
                      style: "destructive",
                      onPress: () => blockFriendHandler(requestUser, dispatch),
                    },
                  ]
                );
              }}
            >
              Block
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const deleteFriendHandler = async (
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
export const blockFriendHandler = async (
  userContact: ContactType,
  dispatch: Dispatch
) => {
  const updateContact = await API.graphql(
    graphqlOperation(updateUserContact, {
      input: {
        id: userContact.id,
        requestStatus: "BLOCKED",
        _version: userContact._version,
      },
    })
  );

  dispatch(
    updateFriendStatus({
      id: userContact.id,
      requestStatus: "BLOCKED",
      version: userContact._version,
    })
  );
};
