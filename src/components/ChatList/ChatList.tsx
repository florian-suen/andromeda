import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeColor } from "../../../utility/useStyles";

import { subUpdateChatGroup } from "../../subscription/subUpdateChatGroup";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";

dayjs.extend(relativeTime);

type ChatGroupParam = {
  GroupChat: { chatGroupId: string; username: string };
};

export const ChatGroup = ({ chat }: { chat: ChatGroupType }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatGroupParam>>();
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const dispatch = useAppDispatch();
  const chatGroupData = chat.Chatgroup;
  subUpdateChatGroup(chatGroupData, chatGroupData.id, dispatch, true);

  return (
    chatGroupData &&
    chatGroupData.users.items && (
      <Pressable
        android_ripple={{ color: "#222b3d" }}
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.pressed : null,
        ]}
        onPress={() =>
          navigation.navigate("GroupChat", {
            chatGroupId: chatGroupData.id,
            username: chatGroupData.users.items[0].user.username,
          })
        }
      >
        <Image
          source={{
            uri: chatGroupData.users.items[0].user?.image
              ? chatGroupData.users.items[0].user?.image
              : undefined,
          }}
          style={styles.image}
        />
        <View style={styles.main}>
          <View style={styles.item}>
            <Text style={styles.name} numberOfLines={1}>
              {chatGroupData.name
                ? chatGroupData.name
                : chatGroupData.users.items[0].user.username}
            </Text>
            {chatGroupData.LastMessage ? (
              <Text style={styles.time}>
                {dayjs(chatGroupData.LastMessage.createdAt).fromNow(true)}
              </Text>
            ) : null}
          </View>
          <Text style={styles.subtext} numberOfLines={2}>
            {chatGroupData.LastMessage?.message
              ? chatGroupData.LastMessage.message
              : "Newly created chat! Say Hi!"}
          </Text>
        </View>
      </Pressable>
    )
  );
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
