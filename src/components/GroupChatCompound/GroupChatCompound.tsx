import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Button,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { InputBox as InputBoxComponent } from "../InputBox/InputBox";
import { Message } from "../Message/Message";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUserChatGroup } from "../../graphql/mutations";
import { useState, useContext, createContext, PropsWithChildren } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { subUpdateChatGroup } from "../../subscription/subUpdateChatGroup";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";
import { subOnDeleteUserChatGroup } from "../../subscription/subUpdateDeleteUserChatGroup";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { AppDispatch } from "../../redux/store";
import { subCreateMessage } from "../../subscription/subOnCreateMessage";
import { MessageType } from "../../redux/messages/messageSlice";
import { BlurView } from "expo-blur";
import Colors from "../../constants/Colors";
type GroupChatContext = {
  alert: {
    blockAlert: boolean;
    setBlockAlert: React.Dispatch<React.SetStateAction<boolean>>;
  };
  navigation: NativeStackNavigationProp<AddContactParam>;
  user: {
    users: ChatGroupType["Chatgroup"]["users"]["items"] | [];
    leaderId: string | null;
  };
  chatGroup: { chatGroupData: ChatGroupType["Chatgroup"] };
  messages: { messages: MessageType[] | [] };
  modal: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  delete: {
    removeUserHandler: (userChatGroup: {
      _version: string;
      id: string;
    }) => void;
  };
};
type ChatGroupParam = {
  chat: { chatGroupId: string; username: string };
};
type AddContactParam = {
  AddNewContact: { chatGroupId: string; chatGroup: any };
};
const UserContext = createContext<GroupChatContext>({} as GroupChatContext);

export const GroupChat = ({ children }: PropsWithChildren) => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AddContactParam>>();
  const chatGroupId = route.params.chatGroupId;
  const [modalVisible, setModalVisible] = useState(false);
  const [blockAlert, setBlockAlert] = useState(false);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => {
    return state.messages.messages.find(
      (item) => item.chatGroupId === chatGroupId
    );
  });
  const chatGroupData: ChatGroupType["Chatgroup"] = useAppSelector((state) => {
    return state.chatGroup.chatGroup.find(
      (item) => item.Chatgroup.id === chatGroupId
    )!.Chatgroup;
  });

  userChatGroupSubscription(chatGroupId, chatGroupData, dispatch);
  setNavHeaderOptions(navigation, chatGroupData, modalVisible, setModalVisible);
  subCreateMessage(chatGroupId, dispatch);
  subUpdateChatGroup(chatGroupData, chatGroupId, dispatch);

  return (
    <UserContext.Provider
      value={{
        alert: { blockAlert, setBlockAlert },
        navigation,
        user: {
          users: chatGroupData ? chatGroupData.users.items : [],
          leaderId: chatGroupData ? chatGroupData.leaderID : null,
        },
        chatGroup: { chatGroupData },
        messages: { messages: messages ? messages.message : [] },
        modal: { modalVisible, setModalVisible },
        delete: { removeUserHandler },
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {children}
      </KeyboardAvoidingView>
    </UserContext.Provider>
  );
};

function AlertBox() {
  const {
    alert: { blockAlert },
  } = useContext(UserContext);

  if (blockAlert)
    return (
      <View>
        <Text>{"Cannot send message to this user."}</Text>
      </View>
    );
  else return null;
}

function Menu({ children }: PropsWithChildren) {
  const {
    chatGroup: { chatGroupData },

    navigation,
    delete: { removeUserHandler },
    user: { users, leaderId },
    modal: { modalVisible, setModalVisible },
  } = useContext(UserContext);

  const newUsers = ([] as ChatGroupType["Chatgroup"]["users"]["items"]).concat(
    users
  );

  const sortedUsers = newUsers.sort((user) => {
    if (user.user.id === leaderId) return -1;
    return 0;
  });
  const filteredUsers = sortedUsers.filter((user) => !user._deleted);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setModalVisible(!modalVisible)}
      ></Pressable>
      <BlurView intensity={50} style={styles.modalContainer}>
        <Text
          style={{
            fontFamily: "Chakra",
            color: Colors.accent,
            fontSize: 18,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Users
        </Text>
        <FlatList
          data={filteredUsers}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.menuContainer}>
                  <Image
                    source={{ uri: item.user.image! }}
                    style={styles.image}
                  />
                  {index === 0 && leaderId ? (
                    <Text style={styles.menuName}>
                      {item.user.username}(Owner)
                    </Text>
                  ) : (
                    <Text style={styles.menuName}>{item.user.username}</Text>
                  )}
                </View>
                {leaderId ? (
                  <FontAwesome
                    onPress={() =>
                      Alert.alert(
                        "Removing User",
                        `Are you sure that you want to remove ${item.user.username} from this group?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Remove",
                            style: "destructive",
                            onPress: () => removeUserHandler(item),
                          },
                        ]
                      )
                    }
                    name="remove"
                    size={24}
                    color="black"
                  />
                ) : null}
              </>
            );
          }}
        ></FlatList>
        <View style={{ marginTop: 15 }}>
          <Button
            color={Colors.secondary}
            title="Add Friends to Group"
            accessibilityLabel="Adding Friends Button"
            onPress={() => {
              setModalVisible(false);
              navigation!.navigate("AddNewContact", {
                chatGroupId: chatGroupData.id,
                chatGroup: chatGroupData,
              });
            }}
          />
        </View>
      </BlurView>
    </Modal>
  );
}

function Messages() {
  const {
    messages: { messages },
  } = useContext(UserContext);

  return (
    <FlatList
      inverted
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
    ></FlatList>
  );
}

function InputBox() {
  const {
    alert: { setBlockAlert, blockAlert },
    chatGroup: { chatGroupData },
  } = useContext<GroupChatContext>(UserContext);

  return (
    <InputBoxComponent
      chatGroup={chatGroupData}
      blockData={{ blockAlert, setBlockAlert }}
    />
  );
}

function removeUserHandler(userChatGroup: { _version: string; id: string }) {
  API.graphql(
    graphqlOperation(deleteUserChatGroup, {
      input: {
        _version: userChatGroup._version,
        id: userChatGroup.id,
      },
    })
  );
}

function setNavHeaderOptions(
  navigation: NativeStackNavigationProp<AddContactParam>,
  chatGroupData: ChatGroupType["Chatgroup"],
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(
    () =>
      navigation.setOptions({
        title:
          chatGroupData && chatGroupData.name
            ? chatGroupData.name
            : chatGroupData?.users?.items[0]?.user?.username,
        headerRight: () => {
          return modalVisible ? (
            <MaterialIcons
              style={{ zIndex: 20 }}
              name="menu-open"
              size={24}
              color={Colors.tertiary}
            />
          ) : (
            <MaterialIcons
              onPress={() => {
                setModalVisible(true);
              }}
              name="menu"
              size={24}
              color={Colors.tertiary}
            />
          );
        },
      }),
    [modalVisible, chatGroupData]
  );
}

function userChatGroupSubscription(
  chatGroupId: string,
  chatGroupData: ChatGroupType["Chatgroup"],
  dispatch: AppDispatch
) {
  useEffect(() => {
    let unsubDelUserChatGroup: () => void;

    unsubDelUserChatGroup = subOnDeleteUserChatGroup(chatGroupData, dispatch);

    return () => {
      unsubDelUserChatGroup();
    };
  }, [chatGroupId]);
}

const styles = StyleSheet.create({
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  menuName: { color: "#fff5ee", fontFamily: "Exo2" },
  menuContainer: { flexDirection: "row", padding: 8 },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.5,
  },
  modalContainer: {
    margin: 75,
    backgroundColor: " Colors.accent",
    borderRadius: 5,
    padding: 20,
  },
});

GroupChat.Menu = Menu;
GroupChat.Messages = Messages;
GroupChat.InputBox = InputBox;
GroupChat.AlertBox = AlertBox;
