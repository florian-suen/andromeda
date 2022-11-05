import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeColor } from "../../../utility/useStyles";

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

const styleSheet = {
  pressed: { opacity: 0.7, backgroundColor: "#151b26" },

  container: {
    flexDirection: "row",
    marginVertical: 0,
    marginHorizontal: 8,
    height: 100,
    alignItems: "center",
    justifyContent: "center",

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#18202e",
  },
  main: {
    flex: 1,
  },
  item: { flexDirection: "row" },
  name: {
    flex: 1,
    fontWeight: "bold",
    color: "primary",
    fontSize: 18,
  },
  subtext: {
    color: "gray",
  },
  time: {
    color: "gray",
    marginBottom: 0,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
};

export const ChatGroup = ({ chat }: { chat: Chat }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = StyleSheet.create(useThemeColor(styleSheet));

  return (
    <Pressable
      android_ripple={{ color: "#222b3d" }}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
      onPress={() =>
        navigation.navigate("Chat", { id: chat.id, user: chat.user.name })
      }
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
          <Text style={styles.time}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text style={styles.subtext} numberOfLines={2}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );
};
