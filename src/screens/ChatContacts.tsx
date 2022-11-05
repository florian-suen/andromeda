import { FlatList } from "react-native";
import { ChatContactsComponent } from "../components/ChatContacts/ChatContacts";

export const ChatContacts = () => {
  return (
    <FlatList
      data={[
        {
          id: 1,
          user: {
            image:
              "http://sropr.com/wp-content/uploads/2021/02/Photo-Jan-21-6-23-33-AM-1-scaled.jpg",
            name: "Suren",
          },
        },
      ]}
      renderItem={({ item }) => <ChatContactsComponent user={item} />}
    ></FlatList>
  );
};
