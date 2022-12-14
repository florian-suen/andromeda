import { View, Text, FlatList } from "react-native";
import { ChatGroup } from "../../components/ChatList/ChatList";
import { useEffect, useContext, useRef } from "react";
import { subOnCreateUserChatGroup } from "../../subscription/subOnCreateUserChatGroup";
import { userContext } from "../../../utility/userAuth";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { getChatGroup } from "../../redux/chatGroup/chatGroupSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getContactList } from "../../redux/contactList/contactListSlice";
import { getMessageList } from "../../redux/messages/messageSlice";

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
type RootStackParamList = {
  GroupChat: { chatGroupId: string; username: string };
};
export const ChatList = () => {
  const messageLoaded = useRef(false);
  const userAuth = useContext(userContext);
  const dispatch = useAppDispatch();
  const chatGroup = useAppSelector((state) => state.chatGroup.chatGroup);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    dispatch(getChatGroup(userAuth));
    dispatch(getContactList());
  }, []);

  useEffect(() => {
    if (!messageLoaded.current && chatGroup.length) {
      messageLoaded.current = true;
      dispatch(getMessageList(chatGroup.map((item) => item.Chatgroup.id)));
    }
  }, [chatGroup]);

  subOnCreateUserChatGroup(userAuth, navigation, dispatch);

  return chatGroup && chatGroup?.length ? (
    <FlatList
      keyExtractor={(item) => {
        return item.Chatgroup.id;
      }}
      extraData={chatGroup}
      data={chatGroup ? chatGroup : []}
      renderItem={({ item, index }) => {
        return <ChatGroup key={index} chat={item} />;
      }}
    ></FlatList>
  ) : (
    <View>
      <Text>Welcome to Andromeda</Text>
    </View>
  );
};
