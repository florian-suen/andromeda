import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../components/ChatList/ChatList";

export const ChatList = () => {
  return (
    <FlatList
      data={[
        {
          id: 1,
          user: {
            image:
              "http://sropr.com/wp-content/uploads/2021/02/Photo-Jan-21-6-23-33-AM-1-scaled.jpg",
            name: "Jacob",
          },
          lastMessage: {
            text: "A is the coolest guy in the world, and I am lame",
            createdAt: "2020-04-02T08:02:17-05:00",
          },
        },
        {
          id: 2,
          user: {
            image:
              "https://qph.cf2.quoracdn.net/main-qimg-5976c01cef6aeb6493beebc3cdd72194-lq",
            name: "Suren",
          },
          lastMessage: {
            text: "BOOM SHAKA",
            createdAt: "2020-04-02T08:02:17-05:00",
          },
        },
      ]}
      renderItem={({ item }) => <ChatGroup chat={item} />}
    ></FlatList>
  );
};
