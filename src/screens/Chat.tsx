import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { InputBox } from "../components/InputBox/InputBox";
import { Message } from "../components/Message/Message";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getChatGroup, listMessagesByChatGroup } from "../graphql/queries";
import { onCreateMessage, onUpdateChatGroup } from "../graphql/subscriptions";
import { ChatGroupType } from "../screens/ChatsList/ChatsList";
import { useState } from "react";
type ChatGroupParam = {
  user: { chatGroup: Partial<ChatGroupType>; username: string };
};

export const Chat = () => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation = useNavigation();
  const chatGroupId = route.params.chatGroup.Chatgroup?.id;
  const [chatGroupData, setChatGroupData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  chatGroupData && console.log(chatGroupData);
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
            console.log(value.data.onUpdateChatGroup);
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
      console.log("cleanup MSG unsubscribe");
    };
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
};
