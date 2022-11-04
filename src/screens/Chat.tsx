import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { InputBox } from "../components/InputBox/InputBox";
import { Message } from "../components/Message/Message";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

type UserParam = {
  user: { id: number; user: string };
};

const message = [
  {
    id: "2",
    message:
      "Heya Man! GFMKMGKFMGFKLMSGKLGMFKLSMGKLm KMGKLSMGKLGMKLGMLKSDMG GMDKLSMKLGMKLGMKLGMLKSMDGKLGM",
    createdAt: "2020-04-02T08:02:17-05:00",
    user: { id: "1", username: "Sam" },
  },
  {
    id: "1",
    message:
      "Hey Man! GFMKMGKFMGFKLMSGKLGMFKLSMGKLm KMGKLSMGKLGMKLGMLKSDMG GMDKLSMKLGMKLGMKLGMLKSMDGKLGM",
    createdAt: "2020-04-02T08:02:17-05:00",
    user: { id: "1", username: "Sam" },
  },
];

export const Chat = () => {
  const route = useRoute<RouteProp<UserParam, "user">>();
  const navigation = useNavigation();

  useEffect(
    () => navigation.setOptions({ title: route.params.user }),
    [route.params.id]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        inverted
        data={message}
        renderItem={({ item }) => <Message message={item} />}
      ></FlatList>
      <InputBox />
    </KeyboardAvoidingView>
  );
};
