import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { subUpdateChatGroup } from "../../subscription/subUpdateChatGroup";
import { useAppDispatch } from "../../../utility/useReduxHooks";
import { ChatGroupType } from "../../redux/chatGroup/chatGroupSlice";
import Colors from "../../constants/Colors";

dayjs.extend(relativeTime);

type ChatGroupParam = {
  GroupChat: { chatGroupId: string; username: string };
};

export const ChatGroup = ({ chat }: { chat: ChatGroupType }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatGroupParam>>();
  const dispatch = useAppDispatch();
  const chatGroupData = chat.Chatgroup;
  subUpdateChatGroup(chatGroupData, chatGroupData.id, dispatch, true);

  return (
    chatGroupData &&
    chatGroupData.users.items && (
      <Pressable
        android_ripple={{ color: Colors.primary }}
        style={({ pressed }) => [pressed ? styles.pressed : null]}
        onPress={() =>
          navigation.navigate("GroupChat", {
            chatGroupId: chatGroupData.id,
            username: chatGroupData.users.items[0].user.username,
          })
        }
      >
        <BlurView intensity={20} style={styles.mainContainer}>
          <Image
            source={{
              uri: chatGroupData.users.items[0].user?.image
                ? chatGroupData.users.items[0].user?.image
                : undefined,
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
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
        </BlurView>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.7, backgroundColor: Colors.secondary },

  container: {
    flexDirection: "row",
    marginVertical: 0,
    marginHorizontal: 8,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.tertiary,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
    padding: 5,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    padding: 5,
  },
  item: { flexDirection: "row" },
  name: {
    flex: 1,
    color: Colors.accent,
    fontSize: 20,
    fontFamily: "Exo2",
  },
  subtext: {
    color: Colors.gray,
    fontSize: 12,
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: Colors.gray,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
});
