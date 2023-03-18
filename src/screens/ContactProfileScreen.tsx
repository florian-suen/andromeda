import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, Image, StyleSheet } from "react-native";
import { useExistingChatGroups } from "../../utility/useExistingChatGroups";
import { useAppDispatch, useAppSelector } from "../../utility/useReduxHooks";
import { Dispatch } from "../components/Contacts/Contacts";
import { updateFriendStatus } from "../redux/contactList/contactListSlice";
import { v4 as uuidv4 } from "uuid";
import { API, graphqlOperation } from "aws-amplify";
import { createChatGroup, createUserChatGroup } from "../graphql/mutations";
import { Ionicons } from "@expo/vector-icons";
import {
  ChatGroupType,
  createNewChatGroup,
} from "../redux/chatGroup/chatGroupSlice";

import { useNavigation } from "@react-navigation/native";
import { updateUserContact } from "./AddFriend/queries";
import { ContactType } from "../redux/contactList/types";
import { CurrentUserType } from "../redux/currentUser/types";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
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
        <View
          style={{
            padding: 15,
            paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: currentContact.friend.image }}
          />
          <View style={{}}>
            <View style={styles.textContainer}>
              <Text style={styles.textProp}>Username:</Text>
              <Text style={styles.text}>{currentContact.friend.username}</Text>
            </View>
            <View style={[styles.textContainer, { marginLeft: 26 }]}>
              <Text numberOfLines={3} style={styles.textProp}>
                Status:
              </Text>
              <Text numberOfLines={2} style={[styles.text]}>
                {currentContact.friend.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={styles.textProp}>Invite Code</Text>
        <Text
          style={[
            styles.text,
            {
              maxWidth: 350,
              backgroundColor: Colors.white,
              color: Colors.black,
              padding: 3,
              borderRadius: 3,
            },
          ]}
        >
          {currentContact.friend.inviteId}
        </Text>
        <Ionicons name="copy" size={24} color="black" />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            createChatGroupHandler(
              currentContact.friend,
              currentUser!,
              navigation,
              dispatch,
              chatGroupList
            );
          }}
        >
          Send Message
        </Button>
        {currentContact.requestStatus === "BLOCKED" ? (
          <Button mode="contained" style={styles.button} disabled>
            Blocked
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => blockFriendHandler(currentContact, dispatch)}
          >
            Block User
          </Button>
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
  container: {
    alignItems: "center",
    marginTop: "30%",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 3,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: Colors.info,
  },
  textContainer: { flexDirection: "row" },
  text: {
    fontFamily: "Exo2",
    color: Colors.accent,
    fontSize: 16,
    maxWidth: 200,
  },
  textProp: {
    fontFamily: "Exo2Bold",
    color: Colors.info,
    fontSize: 15,
    marginRight: 3,
  },
  button: {
    justifyContent: "center",
    height: 45,
    width: "100%",
    borderRadius: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
  },
});
