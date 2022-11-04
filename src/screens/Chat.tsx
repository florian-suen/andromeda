import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ChatGroup } from "../components/ChatGroup/ChatGroup";
import { Message } from "../components/Message/Message";
const message = [
  {
    id: "2",
    message:
      "Heya Man! GFMKMGKFMGFKLMSGKLGMFKLSMGKLm KMGKLSMGKLGMKLGMLKSDMG GMDKLSMKLGMKLGMKLGMLKSMDGKLGM",
    createdAt: "2020-04-02T08:02:17-05:00",
    user: { id: "1", username: "Sam" },
  },
  {
    id: "1",
    message:
      "Hey Man! GFMKMGKFMGFKLMSGKLGMFKLSMGKLm KMGKLSMGKLGMKLGMLKSDMG GMDKLSMKLGMKLGMKLGMLKSMDGKLGM",
    createdAt: "2020-04-02T08:02:17-05:00",
    user: { id: "1", username: "Sam" },
  },
];

export const Chat = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        inverted
        data={message}
        renderItem={({ item }) => <Message message={item} />}
      ></FlatList>
    </KeyboardAvoidingView>
  );
};
