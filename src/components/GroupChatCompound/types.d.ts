type GroupChatContext = {
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

type ChatGroupParam = {
  chat: { chatGroupId: string; username: string };
};
type AddContactParam = {
  AddNewContact: { chatGroupId: string; chatGroup: any };
};
