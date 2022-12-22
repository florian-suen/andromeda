import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../../components/ChatList/ChatList";
import { useEffect, useContext } from "react";
import { useOnCreateUserChatGroup } from "../../../utility/useOnCreateUserChatGroup";
import { userContext } from "../../../utility/userAuth";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { getChatGroup } from "../../redux/chatGroup/chatGroupSlice";

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
  const userAuth = useContext(userContext);
  const chatGroup = useAppSelector((state) => state.chatGroup).chatGroup;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChatGroup(userAuth));
  }, []);

  useOnCreateUserChatGroup(userAuth, dispatch);

  return chatGroup && chatGroup?.length ? (
    <FlatList
      keyExtractor={(item) => {
        return item.Chatgroup.id;
      }}
      extraData={chatGroup}
      data={chatGroup ? chatGroup : []}
      renderItem={({ item, index }) => {
        return <ChatGroup chat={item} />;
      }}
    ></FlatList>
  ) : (
    <View>
      <Text>Welcome to Andromeda</Text>
    </View>
  );
};
