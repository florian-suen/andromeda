import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeColor } from "../../../utility/useStyles";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatGroup } from "../../graphql/subscriptions";
import { ChatGroupType } from "../../screens/ChatsList/ChatsListScreen";
dayjs.extend(relativeTime);

type ChatGroupParam = {
  Chat: { chatGroupId: string; username: string };
};

export const ChatGroup = ({
  chat,
  setReOrder,
}: {
  chat: ChatGroupType;
  setReOrder: (chatGroupId: string) => void;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatGroupParam>>();
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const [chatGroupData, setChatGroupData] = useState(chat.Chatgroup);

  useEffect(() => {
    const onUpdateChatGrp = API.graphql(
      graphqlOperation(onUpdateChatGroup, {
        filter: { id: { eq: chatGroupData.id } },
      })
    );

    const chatGrpSubscription =
      "subscribe" in onUpdateChatGrp &&
      onUpdateChatGrp.subscribe({
        next: ({ value }: any) => {
          setReOrder(value.data.onUpdateChatGroup.id);
          setChatGroupData((chatGroup: any) => {
            return { ...(chatGroup || {}), ...value.data.onUpdateChatGroup };
          });
        },
        error: (err) => console.log(err),
      });

    return () => {
      console.log("Unsubscribing Chatgroup");
      chatGrpSubscription && chatGrpSubscription.unsubscribe;
    };
  }, [chatGroupData.id]);

  return (
    <Pressable
      android_ripple={{ color: "#222b3d" }}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
      onPress={() =>
        navigation.navigate("Chat", {
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
            {chatGroupData.users.items[0].user.username}
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
            : null}
        </Text>
      </View>
    </Pressable>
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
