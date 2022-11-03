import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../components/chatgroup/ChatGroup";
import { Message } from "../components/message/Message";
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
    <FlatList
      inverted
      data={message}
      renderItem={({ item }) => <Message message={item} />}
    ></FlatList>
  );
};
