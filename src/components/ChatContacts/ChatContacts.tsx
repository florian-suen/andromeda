import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../models/index";
type RootStackParamList = {
  Chat: { id: number; user: string };
};

export const ChatContactsComponent = ({ user }: { user: User }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const image = user.image ? user.image : undefined;
  return (
    <Pressable
      android_ripple={{ color: "#222b3d" }}
      onPress={() =>
        navigation.navigate("Chat", {
          id: parseInt(user.id),
          user: user.username,
        })
      }
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.main}>
        <View style={styles.item}>
          <Text style={styles.name} numberOfLines={1}>
            {user.username}
          </Text>
        </View>
        <Text style={styles.status}>{user.status}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.7, backgroundColor: "#151b26" },

  container: {
    flexDirection: "row",
    marginVertical: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#18202e",
    backgroundColor: "#1c222e",
  },
  main: {
    flex: 1,
  },
  item: { flexDirection: "row" },
  name: { flex: 1, fontWeight: "bold", color: "#DAD5CF", fontSize: 18 },
  status: {
    color: "gray",
    marginRight: 10,
  },
  time: {
    color: "gray",
    marginBottom: 0,
  },
  image: {
    marginLeft: 20,
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 5,
  },
});
