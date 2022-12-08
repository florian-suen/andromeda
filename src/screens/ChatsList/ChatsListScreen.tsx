import { View, Text, FlatList, Animated, StyleSheet } from "react-native";
import { ChatGroup } from "../../components/ChatList/ChatList";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUser } from "./queries";
import { useEffect, useState, useRef } from "react";

export type ChatGroupType = {
  Chatgroup: {
    LastMessage: { message: string; id: string; createdAt: string };
    id: string;
    name: string;
    image: string;
    users: {
      items: {
        user: { id: string; image: string | null; username: string };
        Chatgroup: {
          id: string;
          image: string;
          name: string;
          LastMessage: { message: string; id: string; createdAt: string };
        };
      }[];
    };
  };
  user: {
    Chatgroup: {
      LastMessage: { message: string; id: string; createdAt: string };
    };
    user: { id: string; image: string | null; username: string };
  };
};

export const ChatList = () => {
  const [chatGroup, setChatGroup] = useState<any>();
  const reOrderHandler = (chatGroupId: string) => {
    const sortedChatGroup = chatGroup.sort(
      (a: ChatGroupType, b: ChatGroupType) => {
        if (a.Chatgroup.id === chatGroupId) return -1;
        return 0;
      }
    );

    setChatGroup([...sortedChatGroup]);
  };

  useEffect(() => {
    fetchChatGroup(setChatGroup);
  }, []);

  return chatGroup?.length ? (
    <FlatList
      keyExtractor={(item) => {
        return item.Chatgroup.id;
      }}
      extraData={chatGroup.updatedAt}
      data={chatGroup ? chatGroup : []}
      renderItem={({ item, index }) => {
        return <ChatGroup chat={item} setReOrder={reOrderHandler} />;
      }}
    ></FlatList>
  ) : (
    <View>
      <Text>Welcome to Andromeda</Text>
    </View>
  );
};

const fetchChatGroup = async (setChatGroup: React.Dispatch<any>) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  const chatGroupResp = await API.graphql(
    graphqlOperation(GetUser, { id: currentUser.attributes.sub })
  );
  const chatgroupItems =
    "data" in chatGroupResp && chatGroupResp.data.getUser.ChatGroups
      ? chatGroupResp.data.getUser.ChatGroups.items
      : null;
  if (chatgroupItems.length) {
    const filteredChatGroup = chatgroupItems.filter(
      (value: any) => !value._deleted
    );
    for (let x = 0; x < filteredChatGroup.length; x += 1) {
      let filterUser;
      if (filteredChatGroup[x].Chatgroup?.users) {
        filterUser = filteredChatGroup[x].Chatgroup?.users?.items.filter(
          (v: any) => v.user.id !== currentUser.attributes.sub
        );
      }
      filteredChatGroup[x].Chatgroup.users.items = filterUser;
    }
    setChatGroup(filteredChatGroup);
  }
};