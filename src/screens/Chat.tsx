import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../components/chatlist/ChatGroup";

export const Chat = () => {
  return (
    <FlatList
      data={[
        {
          id: "1",
          user: {
            image:
              "http://sropr.com/wp-content/uploads/2021/02/Photo-Jan-21-6-23-33-AM-1-scaled.jpg",
            name: "Renji",
          },
          lastMessage: {
            text: "A is the coolest guy in the world, and I am lame",
            createdAt: "05:45",
          },
        },
      ]}
      renderItem={({ item }) => <ChatGroup chat={item} />}
    ></FlatList>
  );
};
