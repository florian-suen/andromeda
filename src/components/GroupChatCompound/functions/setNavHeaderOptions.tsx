import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ChatGroupType } from "../../../redux/chatGroup/chatGroupSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { AddContactParam } from "../types";

export const setNavHeaderOptions = (
  navigation: NativeStackNavigationProp<AddContactParam>,
  chatGroupData: ChatGroupType["Chatgroup"],
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    return navigation.setOptions({
      title:
        chatGroupData && chatGroupData.name
          ? chatGroupData.name
          : chatGroupData?.users?.items[0]?.user?.username,
      headerTintColor: Colors.white,
      headerTitleStyle: { color: Colors.white, fontFamily: "Chakra" },
      headerRight: () => {
        return modalVisible ? (
          <MaterialIcons
            style={{ zIndex: 20 }}
            name="menu-open"
            size={24}
            color={Colors.white}
          />
        ) : (
          <MaterialIcons
            onPress={() => {
              setModalVisible(true);
            }}
            name="menu"
            size={24}
            color={Colors.white}
          />
        );
      },
    });
  }, [modalVisible, chatGroupData]);
};
