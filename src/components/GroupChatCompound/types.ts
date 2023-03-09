import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animated } from "react-native";
import { ChatGroupType } from "../../redux/chatGroup/types";
import { MessageType } from "../../redux/messages/types";

export type GroupChatContext = {
  messageTiming: {
    transformY: React.MutableRefObject<Animated.Value>;
    reverseTranslateYTiming: () => void;
  };
  inputSelector: {
    openSelector: boolean;
    setOpenSelector: React.Dispatch<React.SetStateAction<boolean>>;
  };
  alert: {
    blockAlert: boolean;
    setBlockAlert: React.Dispatch<React.SetStateAction<boolean>>;
  };
  navigation: NativeStackNavigationProp<AddContactParam>;
  user: {
    users: ChatGroupType["Chatgroup"]["users"]["items"] | [];
    leaderId: string | null;
  };
  chatGroup: { chatGroupData: ChatGroupType["Chatgroup"] };
  messages: { messages: MessageType[] | [] };
  modal: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  delete: {
    removeUserHandler: (userChatGroup: {
      _version: string;
      id: string;
    }) => void;
  };
};

export type ChatGroupParam = {
  chat: { chatGroupId: string; username: string };
};
export type AddContactParam = {
  AddNewContact: { chatGroupId: string; chatGroup: any };
};
