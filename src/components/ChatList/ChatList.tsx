import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

dayjs.extend(relativeTime);

type RootStackParamList = {
  Chat: { id: number; user: string };
};

type Chat = {
  id: number;
  user: {
    image: string;
    name: string;
  };
  lastMessage: {
    text: string;
    createdAt: string;
  };
};

export const ChatGroup = ({ chat }: { chat: Chat }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", { id: chat.id, user: chat.user.name })
      }
      style={styles.container}
    >
      <Image
        source={{
          uri: chat.user.image,
        }}
        style={styles.image}
      />
      <View style={styles.main}>
        <View style={styles.item}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.user.name}
          </Text>
          <Text style={styles.subtext}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.subtext}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    height: 100,
  },
  main: {
    flex: 1,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: { flexDirection: "row" },
  name: { flex: 1, fontWeight: "bold" },
  subtext: { color: "gray" },
  image: { width: 100, height: 100, marginRight: 10, borderRadius: 20 },
});
