import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import { useExistingChatGroups } from "../../utility/useExistingChatGroups";
import { useAppDispatch, useAppSelector } from "../../utility/useReduxHooks";
import { Dispatch } from "../components/Contacts/Contacts";
import {
  ContactType,
  updateFriendStatus,
} from "../redux/contactList/contactListSlice";
import { v4 as uuidv4 } from "uuid";
import { API, graphqlOperation } from "aws-amplify";
import { createChatGroup, createUserChatGroup } from "../graphql/mutations";
import {
  ChatGroupType,
  createNewChatGroup,
} from "../redux/chatGroup/chatGroupSlice";
import { CurrentUserType } from "../redux/currentUser/currentUserSlice";
import { useNavigation } from "@react-navigation/native";
import { updateUserContact } from "./AddFriend/queries";
type RouteParam = {
  ContactProfile: { contactId: string };
};

type RootStackParamList = {
  GroupChat: { chatGroupId: string };
};

export const ContactProfileScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RouteParam>>();
  const contactId = route.params.contactId;
  const currentContact = useAppSelector(
    (state) => state.contacts.contacts
  ).find((item) => item.id === contactId)!;
  const chatGroupList = useAppSelector((state) => state.chatGroup.chatGroup);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: currentContact.friend.image }}
        />
        <Text>{currentContact.friend.username}</Text>
        <Text>{currentContact.friend.status}</Text>
        <Text>{currentContact.friend.inviteId}</Text>
      </View>
      <View>
        <Button
          title="Send Message"
          onPress={() => {
            createChatGroupHandler(
              currentContact.friend,
              currentUser!,
              navigation,
              dispatch,
              chatGroupList
            );
          }}
        />
        {currentContact.requestStatus === "BLOCKED" ? (
          <Button title="Blocked" />
        ) : (
          <Button
            title="Block User"
            onPress={() => blockFriendHandler(currentContact, dispatch)}
          />
        )}
      </View>
    </View>
  );
};

const blockFriendHandler = async (
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
      version: userContact._version + 1,
    })
  );
};

const createChatGroupHandler = async (
  friend: ContactType["friend"],
  currentUser: CurrentUserType,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  dispatch: Dispatch,
  chatGroupList: ChatGroupType[]
) => {
  const existingChatGroup = await useExistingChatGroups(
    friend.id,
    currentUser.id,
    chatGroupList
  );

  if (existingChatGroup) {
    navigation.navigate("GroupChat", {
      chatGroupId: existingChatGroup.Chatgroup.id,
    });
    return;
  }
  const chatGroupId: string = uuidv4();
  const friendUser = friend;
  const mainUser = currentUser;
  const userNames = [friendUser.username];
  const usersArray = [{ user: friendUser }, { user: mainUser }];

  dispatch(
    createNewChatGroup({
      chatGroupId,
      userNames,
      users: usersArray as { user: CurrentUserType }[],
      leaderID: null,
    })
  );

  navigation.navigate("GroupChat", {
    chatGroupId: chatGroupId,
  });

  const newChatGroupResp = await API.graphql(
    graphqlOperation(createChatGroup, {
      input: { id: chatGroupId },
      name: `${userNames.join(" ")} `,
    })
  );

  if ("data" in newChatGroupResp && !newChatGroupResp.data?.createChatGroup)
    console.log("Error creating chatgroup");

  await API.graphql(
    graphqlOperation(createUserChatGroup, {
      input: { chatgroupID: chatGroupId, userID: friend.id },
    })
  );

  await API.graphql(
    graphqlOperation(createUserChatGroup, {
      input: {
        chatgroupID: chatGroupId,
        userID: currentUser.id,
      },
    })
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  image: { height: 200, width: 200 },
});
