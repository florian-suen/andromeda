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

import { InputBox as InputBx } from "./InputBox/InputBox";
import { Message } from "./Message/Message";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getChatGroup, listMessagesByChatGroup } from "../graphql/queries";
import { deleteUserChatGroup } from "../graphql/mutations";
import { onCreateMessage } from "../graphql/subscriptions";
import { useState, useContext, createContext, PropsWithChildren } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useUpdateChatGroup } from "../../utility/useUpdateChatGroup";
import { ChatGroupType } from "../screens/ChatsList/ChatsListScreen";
import {
  useOnDeleteUserChatGroup,
  useOnCreateUserChatGroup,
} from "../../utility/useUpdateUserChatGroup";

type ChatGroup = ChatGroupType["Chatgroup"];

type ChatGroupParam = {
  chat: { chatGroupId: string; username: string };
};
type AddContactParam = {
  AddContact: { chatGroupId: string; chatGroup: any };
};

const UserContext = createContext<{
  [p: string]: any;
  navigation?: NativeStackNavigationProp<AddContactParam>;
}>({});

export const GroupChat = ({ children }: PropsWithChildren) => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AddContactParam>>();
  const chatGroupId = route.params.chatGroupId;
  const [chatGroupData, setChatGroupData] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  getChatGroupData(chatGroupId, setChatGroupData);
  setNavHeaderOptions(navigation, chatGroupData, modalVisible, setModalVisible);
  getandSubMessages(chatGroupId, setMessages);
  useUpdateChatGroup(chatGroupData, setChatGroupData, chatGroupId);

  return (
    <UserContext.Provider
      value={{
        navigation,
        user: {
          users: chatGroupData ? chatGroupData?.users?.items : [],
          leaderId: chatGroupData ? chatGroupData.leaderID : null,
        },
        chatGroup: { chatGroupData, setChatGroupData },
        messages: { messages, setMessages },
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

function Menu({ children }: PropsWithChildren) {
  const {
    chatGroup: { chatGroupData },
    navigation,
    delete: { removeUserHandler },
    user: { users, leaderId },
    modal: { modalVisible, setModalVisible },
  } = useContext(UserContext);

  const sortedUsers = users.sort((user: any) => {
    if (user.user.id === leaderId) return -1;

    return 0;
  });
  const filteredUsers = sortedUsers.filter((user: any) => !user._deleted);

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
      <View style={styles.modalContainer}>
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 15 }}>
          Users
        </Text>
        <FlatList
          data={filteredUsers}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.menuContainer}>
                  <Image
                    source={{ uri: item.user.image }}
                    style={styles.image}
                  />
                  {index === 0 && leaderId ? (
                    <Text>{item.user.username}(Owner)</Text>
                  ) : (
                    <Text>{item.user.username}</Text>
                  )}
                </View>
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
              </>
            );
          }}
        ></FlatList>
        <Button
          title="Add Friends to Group"
          accessibilityLabel="Adding Friends Button"
          onPress={() => {
            setModalVisible(false);
            navigation!.navigate("AddContact", {
              chatGroupId: chatGroupData.id,
              chatGroup: chatGroupData,
            });
          }}
        />
      </View>
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
    chatGroup: { chatGroupData },
  } = useContext(UserContext);

  return <InputBx chatGroup={chatGroupData} />;
}

function removeUserHandler(userChatGroup: { _version: string; id: string }) {
  API.graphql(
    graphqlOperation(deleteUserChatGroup, {
      input: { _version: userChatGroup._version, id: userChatGroup.id },
    })
  );
}

function getandSubMessages(
  chatGroupId: string,
  setMessages: React.Dispatch<any>
) {
  useEffect(() => {
    const messageResp = API.graphql(
      graphqlOperation(listMessagesByChatGroup, {
        chatgroupID: chatGroupId,
        sortDirection: "DESC",
      })
    );

    "then" in messageResp &&
      messageResp.then((results) => {
        setMessages(results.data?.listMessagesByChatGroup?.items);
      });

    const onCreateMsg = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const msgSubscription =
      "subscribe" in onCreateMsg &&
      onCreateMsg.subscribe({
        next: ({ value }: any) => {
          setMessages((msg: any) => [value.data.onCreateMessage, ...msg]);
        },
        error: (err) => {
          console.log(err);
        },
      });

    return () => {
      msgSubscription && msgSubscription.unsubscribe();
    };
  }, [chatGroupId]);
}

function setNavHeaderOptions(
  navigation: NativeStackNavigationProp<AddContactParam>,
  chatGroupData: ChatGroup,
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
              color="black"
            />
          ) : (
            <MaterialIcons
              onPress={() => {
                setModalVisible(true);
              }}
              name="menu"
              size={24}
              color="black"
            />
          );
        },
      }),
    [modalVisible, chatGroupData]
  );
}

function getChatGroupData(
  chatGroupId: string,
  setChatGroupData: React.Dispatch<any>
) {
  useEffect(() => {
    let unsubDelUserChatGroup: () => void;
    let unsubCreateUserChatGroup: () => void;
    const chatGroupResp = API.graphql(
      graphqlOperation(getChatGroup, { id: chatGroupId })
    );
    "then" in chatGroupResp &&
      chatGroupResp.then((results) => {
        setChatGroupData(results.data.getChatGroup);
        unsubDelUserChatGroup = useOnDeleteUserChatGroup(
          results.data.getChatGroup,
          setChatGroupData
        );

        unsubCreateUserChatGroup = useOnCreateUserChatGroup(
          results.data.getChatGroup,
          setChatGroupData
        );
      });

    return () => {
      unsubDelUserChatGroup(), unsubCreateUserChatGroup();
    };
  }, [chatGroupId]);
}

const styles = StyleSheet.create({
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
  menuContainer: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    alignItems: "center",
    margin: 75,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

GroupChat.Menu = Menu;
GroupChat.Messages = Messages;
GroupChat.InputBox = InputBox;
