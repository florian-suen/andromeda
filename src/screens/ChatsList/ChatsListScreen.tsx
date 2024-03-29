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
import { getCurrentUser } from "../../redux/currentUser/currentUserSlice";
import {
  subOnCreateUserContact,
  subOnDeleteUserContact,
  subonUpdateUserContact,
} from "../../subscription/subUpdateUserContact";
import { subOnCreateBlog } from "../../subscription/subOnCreateBlog";
import Colors from "../../constants/Colors";

type RootStackParamList = {
  GroupChat: { chatGroupId: string; username: string };
};
export const ChatList = () => {
  const messageLoaded = useRef(false);
  const userAuth = useContext(userContext)!;
  const dispatch = useAppDispatch();
  const chatGroup = useAppSelector((state) => state.chatGroup.chatGroup);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    dispatch(getChatGroup(userAuth));
    dispatch(getContactList(userAuth.attributes.sub));
    dispatch(getCurrentUser(userAuth.attributes.sub));
  }, []);
  useEffect(() => {
    if (!messageLoaded.current && chatGroup.length) {
      messageLoaded.current = true;
      dispatch(getMessageList(chatGroup.map((item) => item.Chatgroup.id)));
    }
  }, [chatGroup]);
  subOnDeleteUserContact(userAuth.attributes.sub, dispatch);
  subOnCreateUserChatGroup(userAuth.attributes.sub, dispatch);
  subonUpdateUserContact(userAuth.attributes.sub, dispatch);
  subOnCreateUserContact(userAuth.attributes.sub, dispatch);
  subOnCreateBlog(userAuth.attributes.sub, dispatch);
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          color: Colors.accent,
          textAlign: "center",
          fontFamily: "Exo2",
          fontSize: 20,
        }}
      >
        Start a conversation with a contact!
      </Text>
    </View>
  );
};
