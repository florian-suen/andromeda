import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../../components/ChatList/ChatList";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUser } from "./queries";
import { useEffect, useState } from "react";
import { onUpdateUserChatGroup } from "../../graphql/subscriptions";

export type ChatGroupType = {
  Chatgroup: {
    LastMessage: { message: string; id: string; createdAt: string };
    id: string;
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
  const [chatGroup, setChatGroup] = useState<any>([]);
  const [load, setload] = useState(false);
  const reOrderHandler = (chatGroupId: string) => {
    const sortedChatGroup = chatGroup.sort(
      (a: ChatGroupType, b: ChatGroupType) => {
        if (a.Chatgroup.id === chatGroupId) return -1;

        return 0;
      }
    );

    setload(true);
    setChatGroup([...sortedChatGroup]);
  };

  useEffect(() => {
    const fetchChatGroup = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatGroupResp = await API.graphql(
        graphqlOperation(GetUser, { id: currentUser.attributes.sub })
      );
      if ("data" in chatGroupResp && chatGroupResp.data.getUser.ChatGroups) {
        const filteredGroup = chatGroupResp.data.getUser.ChatGroups.items.map(
          (group: any) => {
            let filterUser;
            if (group?.Chatgroup?.users) {
              filterUser = group?.Chatgroup?.users?.items.filter(
                (v: any) => v.user.id !== currentUser.attributes.sub
              );
            }
            if (group.Chatgroup.users) group.Chatgroup.users.items = filterUser;
            return group;
          }
        );

        setChatGroup(filteredGroup);
      }
    };

    fetchChatGroup();
  }, []);

  console.log("first", chatGroup.length && chatGroup[0].Chatgroup.id);
  return chatGroup?.length ? (
    <FlatList
      keyExtractor={(item) => item.Chatgroup.id}
      extraData={load}
      data={chatGroup ? chatGroup : []}
      renderItem={({ item }) => {
        return <ChatGroup chat={item} setReOrder={reOrderHandler} />;
      }}
    ></FlatList>
  ) : (
    <View>
      <Text>Welcome to Andromeda</Text>
    </View>
  );
};
