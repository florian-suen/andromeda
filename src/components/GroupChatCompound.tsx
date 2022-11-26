import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Animated,
  Image,
  Text,
} from "react-native";
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
  const translateX = useRef(new Animated.Value(500)).current;

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
          return (
            <MaterialIcons
              onPress={() => {
                Animated.timing(translateX, {
                  toValue: 30,
                  useNativeDriver: true,
                  duration: 400,
                }).start();
              }}
              name="menu"
              size={24}
              color="black"
            />
          );
        },
      }),
    [route.params.username]
  );

  console.log(chatGroupData);
  return (
    <UserContext.Provider
      value={{
        /* user: {
          users: "users" in chatGroupData ? chatGroupData?.users?.items : [],
          leaderId: chatGroupData.leaderID || null,
        }, */
        chatGroup: { chatGroupData, setChatGroupData },
        messages: { messages, setMessages },
        animation: { translateX },
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
  /*  const {
    user: { users, leaderId },
    animation: { translateX },
  } = useContext(UserContext);

  return (
    <Animated.View
      style={{
        width: 200,
        height: 200,
        backgroundColor: "black",
        translateX: translateX,
      }}
    >
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <View>
              <Image source={item.user.image} />
              <Text>{item.user.username}</Text>
            </View>
          );
        }}
      ></FlatList>
    </Animated.View>
  ); */
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

/*  export const Chat = () => {
    const route = useRoute<RouteProp<ChatGroupParam>>();
    const navigation = useNavigation();
    const chatGroupId = route.params.chatGroupId;
    const [chatGroupData, setChatGroupData] = useState<any>(null);
  
  
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
      const chatGroupResp = API.graphql(
        graphqlOperation(getChatGroup, { id: chatGroupId })
      );
      "then" in chatGroupResp &&
        chatGroupResp.then((results) =>
          setChatGroupData(results.data.getChatGroup)
        );
    }, [chatGroupId]);
  
    useEffect(
      () => navigation.setOptions({ title: route.params.username }),
      [route.params.username]
    );
  
    if (!chatGroupId) return <ActivityIndicator size="large" color="#00ff00" />;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          inverted
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
        ></FlatList>
        <InputBox chatGroup={chatGroupData} />
      </KeyboardAvoidingView>
    );
  }; */
