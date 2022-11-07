import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useThemeColor } from "../../../utility/useStyles";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import {
  createUserChatGroup,
  createChatGroup,
} from "../../../src/graphql/mutations";
import { User } from "../../models";
dayjs.extend(relativeTime);

type ChatGroupParam = {
  Chat: { chatGroupId: string; username: string };
};

type ChatGroup = {
  chatGroup: {
    id: string;
    users: {
      items: {
        user: { id: string; image: string | null; username: string };
        chatGroup: { LastMessage: string | null };
      }[];
    };
  };
  user: {
    chatGroup: { LastMessage: string | null };
    user: { id: string; image: string | null; username: string };
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

export const ChatGroup = ({ chat, id }: { chat: ChatGroup; id: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatGroupParam>>();
  const styles = StyleSheet.create(useThemeColor(styleSheet));

  const filteredChat = chat.chatGroup.users.items.filter(
    (v) => v.user.id !== id
  );

  return (
    <Pressable
      android_ripple={{ color: "#222b3d" }}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
      onPress={() =>
        navigation.navigate("Chat", {
          chatGroupId: chat.chatGroup.id,
          username: filteredChat[0].user.username,
        })
      }
    >
      <Image
        source={{
          uri: filteredChat[0].user?.image
            ? filteredChat[0].user?.image
            : undefined,
        }}
        style={styles.image}
      />
      <View style={styles.main}>
        <View style={styles.item}>
          <Text style={styles.name} numberOfLines={1}>
            {filteredChat[0].user.username}
          </Text>
          {filteredChat[0].chatGroup.LastMessage ? (
            <Text style={styles.time}>
              {dayjs(filteredChat[0].chatGroup?.LastMessage).fromNow(true)}
            </Text>
          ) : null}
        </View>

        <Text style={styles.subtext} numberOfLines={2}>
          {filteredChat[0].chatGroup?.LastMessage}
        </Text>
      </View>
    </Pressable>
  );
};
