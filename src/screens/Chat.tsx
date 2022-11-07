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
import { getChatGroup } from "../graphql/queries";
import { useState } from "react";
type ChatGroupParam = {
  user: { chatGroupId: string; username: string };
};

export const Chat = () => {
  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation = useNavigation();
  const chatGroupId = route.params.chatGroupId;
  const [chatGroupData, setChatGroupData] = useState<any>(null);

  useEffect(() => {
    const chatGroupResp = API.graphql(
      graphqlOperation(getChatGroup, { id: chatGroupId })
    );
    "then" in chatGroupResp &&
      chatGroupResp.then((results) =>
        setChatGroupData(results.data.getChatGroup)
      );
  }, []);

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
        data={chatGroupData && chatGroupData.Messages.items}
        renderItem={({ item }) => <Message message={item} />}
      ></FlatList>
      <InputBox chatGroup={chatGroupData} />
    </KeyboardAvoidingView>
  );
};
