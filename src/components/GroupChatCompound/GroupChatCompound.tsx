import { KeyboardAvoidingView, Platform, Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useState, createContext, PropsWithChildren, useRef } from "react";
import { subUpdateChatGroup } from "../../subscription/subUpdateChatGroup";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { subCreateMessage } from "../../subscription/subOnCreateMessage";
import { AlertBox } from "./components/AlertBox";
import { Menu } from "./components/Menu";
import { Messages } from "./components/Message";
import { InputBox } from "./components/Input";
import { removeUserHandler } from "./functions/removeUserHandler";
import { userChatGroupSubscription } from "./functions/ChatGroupSubscription";
import { setNavHeaderOptions } from "./functions/setNavHeaderOptions";
export const UserContext = createContext<GroupChatContext>(
  {} as GroupChatContext
);
export const GroupChat = ({ children }: PropsWithChildren) => {
  const transformY = useRef(new Animated.Value(0));

  const route = useRoute<RouteProp<ChatGroupParam>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AddContactParam>>();
  const chatGroupId = route.params.chatGroupId;
  let [openSelector, setOpenSelector] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [blockAlert, setBlockAlert] = useState(false);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => {
    return state.messages.messages.find(
      (item) => item.chatGroupId === chatGroupId
    );
  });
  const chatGroupData: ChatGroupType["Chatgroup"] = useAppSelector((state) => {
    return state.chatGroup.chatGroup.find(
      (item) => item.Chatgroup.id === chatGroupId
    )!.Chatgroup;
  });

  const reverseTranslateYTiming = () =>
    Animated.timing(transformY.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

  userChatGroupSubscription(chatGroupId, chatGroupData, dispatch);
  setNavHeaderOptions(navigation, chatGroupData, modalVisible, setModalVisible);
  subCreateMessage(chatGroupId, dispatch);
  subUpdateChatGroup(chatGroupData, chatGroupId, dispatch);

  return (
    <UserContext.Provider
      value={{
        messageTiming: { transformY: transformY, reverseTranslateYTiming },
        inputSelector: { openSelector, setOpenSelector },
        alert: { blockAlert, setBlockAlert },
        navigation,
        user: {
          users: chatGroupData ? chatGroupData.users.items : [],
          leaderId: chatGroupData ? chatGroupData.leaderID : null,
        },
        chatGroup: { chatGroupData },
        messages: { messages: messages ? messages.message : [] },
        modal: { modalVisible, setModalVisible },
        delete: { removeUserHandler },
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {children}
      </KeyboardAvoidingView>
    </UserContext.Provider>
  );
};

GroupChat.Menu = Menu;
GroupChat.Messages = Messages;
GroupChat.InputBox = InputBox;
GroupChat.AlertBox = AlertBox;
