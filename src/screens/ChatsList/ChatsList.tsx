import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../../components/ChatList/ChatList";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUser } from "./queries";
import { useEffect, useState } from "react";
export const ChatList = () => {
  const [chatGroup, setChatGroup] = useState<any>(null);
  useEffect(() => {
    const fetchChatGroup = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatGroupResp = await API.graphql(
        graphqlOperation(GetUser, { id: currentUser.attributes.sub })
      );
      if (
        "data" in chatGroupResp &&
        chatGroupResp.data.getUser.ChatGroups.items
      )
        setChatGroup({
          chat: chatGroupResp.data.getUser.ChatGroups.items,
          id: currentUser.attributes.sub,
        });
    };

    fetchChatGroup();
  }, []);

  return chatGroup?.chat.length ? (
    <FlatList
      data={chatGroup.chat ? chatGroup.chat : []}
      renderItem={({ item }) => {
        return <ChatGroup chat={item} id={chatGroup.id} />;
      }}
    ></FlatList>
  ) : (
    <View>
      <Text>Welcome to Andromeda</Text>
    </View>
  );
};
