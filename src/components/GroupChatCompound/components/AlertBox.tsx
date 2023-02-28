import { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../GroupChatCompound";

export const AlertBox = () => {
  const {
    alert: { blockAlert },
  } = useContext(UserContext);

  if (blockAlert)
    return (
      <View>
        <Text>{"Cannot send message to this user."}</Text>
      </View>
    );
  else return null;
};
