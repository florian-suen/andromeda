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

import { InputBox as InputBx } from "../InputBox/InputBox";
import { Message } from "../Message/Message";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUserChatGroup, updateAttachment } from "../../graphql/mutations";
import {
  onCreateMessage,
  onCreateAttachment,
  onCreateMedia,
} from "../../graphql/subscriptions";
import { useState, useContext, createContext, PropsWithChildren } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useUpdateChatGroup } from "../../../utility/useUpdateChatGroup";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";
import { useOnDeleteUserChatGroup } from "../../../utility/useUpdateDeleteUserChatGroup";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { AppDispatch } from "../../redux/store";
import {
  addMessage,
  getMessageList,
  updateMessageAttachments,
  updateMessageMedia,
} from "../../redux/messages/messageSlice";

type dispatch = ReturnType<typeof useAppDispatch>;

type ChatGroupParam = {
  chat: { chatGroupId: string; username: string };
};
type AddContactParam = {
  AddNewContact: { chatGroupId: string; chatGroup: any };
};

const UserContext = createContext<{
  [p: string]: any;
  messages: { messages: Message[] };
  navigation?: NativeStackNavigationProp<AddContactParam>;
}>({ messages: { messages: [] } });

export const GroupChat = ({ children }: PropsWithChildren) => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AddContactParam>>();
  const chatGroupId = route.params.chatGroupId;
  const [modalVisible, setModalVisible] = useState(false);
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
  getandSubMessages(chatGroupId, dispatch);
  useUpdateChatGroup(chatGroupData, chatGroupId, dispatch);

  return (
    <UserContext.Provider
      value={{
        navigation,
        user: {
          users: chatGroupData ? chatGroupData?.users?.items : [],
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

function Menu({ children }: PropsWithChildren) {
  const {
    chatGroup: { chatGroupData },
    navigation,
    delete: { removeUserHandler },
    user: { users, leaderId },
    modal: { modalVisible, setModalVisible },
  } = useContext(UserContext);

  const newUsers = [].concat(users);

  const sortedUsers = newUsers.sort((user: any) => {
    if (user.user.id === leaderId) return -1;

    return 0;
  });
  const filteredUsers: any = sortedUsers.filter((user: any) => !user._deleted);

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
            navigation!.navigate("AddNewContact", {
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
      input: {
        _version: userChatGroup._version,
        id: userChatGroup.id,
      },
    })
  );
}

function getandSubMessages(chatGroupId: string, dispatch: dispatch) {
  useEffect(() => {
    dispatch(getMessageList(chatGroupId));

    const onCreateMsg = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const msgSubscription =
      "subscribe" in onCreateMsg &&
      onCreateMsg.subscribe({
        next: ({ value }: any) => {
          value.data.onCreateMessage.Attachments = { items: [] };
          value.data.onCreateMessage.Media = { items: [] };

          dispatch(
            addMessage({ chatGroupId, newMessage: value.data.onCreateMessage })
          );
        },
        error: (err) => {
          console.log(err);
        },
      });

    const onCreateAttach = API.graphql(
      graphqlOperation(onCreateAttachment, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const attachSubscription =
      "subscribe" in onCreateAttach &&
      onCreateAttach.subscribe({
        next: ({ value }: any) => {
          dispatch(
            updateMessageAttachments({
              chatGroupId,
              newAttachment: value.data.onCreateAttachment,
            })
          );
        },
        error: (err) => {
          console.log(err);
        },
      });

    const onCreateMediaSub = API.graphql(
      graphqlOperation(onCreateMedia, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const mediaSubscription =
      "subscribe" in onCreateMediaSub &&
      onCreateMediaSub.subscribe({
        next: ({ value }: any) => {
          dispatch(
            updateMessageMedia({
              chatGroupId,
              newMedia: value.data.onCreateMedia,
            })
          );
        },
        error: (err) => {
          console.log(err);
        },
      });

    return () => {
      msgSubscription && msgSubscription.unsubscribe();
      attachSubscription && attachSubscription.unsubscribe();
    };
  }, [chatGroupId]);
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

function userChatGroupSubscription(
  chatGroupId: string,
  chatGroupData: ChatGroupType["Chatgroup"],
  dispatch: AppDispatch
) {
  useEffect(() => {
    let unsubDelUserChatGroup: () => void;

    unsubDelUserChatGroup = useOnDeleteUserChatGroup(chatGroupData, dispatch);

    return () => {
      unsubDelUserChatGroup();
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
