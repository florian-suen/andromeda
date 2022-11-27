import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Animated,
  Image,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { InputBox as InputBx } from "./InputBox/InputBox";
import { Message } from "./Message/Message";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getChatGroup, listMessagesByChatGroup } from "../graphql/queries";
import { onCreateMessage, onUpdateChatGroup } from "../graphql/subscriptions";
import {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  useRef,
} from "react";
import { MaterialIcons } from "@expo/vector-icons";

type ChatGroupParam = {
  user: { chatGroupId: string; username: string };
};

const UserContext = createContext<{ [p: string]: any }>({});

export const GroupChat = ({ children }: PropsWithChildren) => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation = useNavigation();
  const chatGroupId = route.params.chatGroupId;
  const [chatGroupData, setChatGroupData] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const onUpdateChatGrp = API.graphql(
      graphqlOperation(onUpdateChatGroup, {
        filter: { id: { eq: chatGroupId } },
      })
    );

    const chatGrpSubscription =
      "subscribe" in onUpdateChatGrp &&
      onUpdateChatGrp.subscribe({
        next: ({ value }: any) => {
          setChatGroupData((chatGroup: any) => {
            return { ...(chatGroup || {}), ...value.data.onUpdateChatGroup };
          });
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("unsubscribe Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, [chatGroupId]);

  useEffect(() => {
    const messageResp = API.graphql(
      graphqlOperation(listMessagesByChatGroup, {
        chatgroupID: chatGroupId,
        sortDirection: "DESC",
      })
    );

    "then" in messageResp &&
      messageResp.then((results) =>
        setMessages(results.data?.listMessagesByChatGroup?.items)
      );

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

  useEffect(() => {
    const chatGroupResp = API.graphql(
      graphqlOperation(getChatGroup, { id: chatGroupId })
    );
    "then" in chatGroupResp &&
      chatGroupResp.then((results) =>
        setChatGroupData(results.data.getChatGroup)
      );
  }, [chatGroupId]);

  useEffect(
    () =>
      navigation.setOptions({
        title: route.params.username,
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
    [modalVisible]
  );

  return (
    <UserContext.Provider
      value={{
        user: {
          users: chatGroupData ? chatGroupData?.users?.items : [],
          leaderId: chatGroupData ? chatGroupData.leaderID : null,
        },
        chatGroup: { chatGroupData, setChatGroupData },
        messages: { messages, setMessages },
        modal: { modalVisible, setModalVisible },
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

function Menu() {
  const {
    user: { users, leaderId },
    modal: { modalVisible, setModalVisible },
  } = useContext(UserContext);

  const sortedUsers = users.sort((user: any) => {
    if (user.user.id === leaderId) return -1;

    return 0;
  });

  return (
    <GestureRecognizer
      style={{ flex: 1, position: "absolute" }}
      onSwipeUp={() => setModalVisible(false)}
      onSwipeDown={() => setModalVisible(false)}
    >
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
            data={sortedUsers}
            renderItem={({ item, index }) => {
              return (
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
              );
            }}
          ></FlatList>
        </View>
      </Modal>
    </GestureRecognizer>
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

GroupChat.Menu = Menu;
GroupChat.Messages = Messages;
GroupChat.InputBox = InputBox;

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
