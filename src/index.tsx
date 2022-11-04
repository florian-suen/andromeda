import { ChatList } from "./screens/ChatsList";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Chat } from "./screens/Chat";
import { InputBox } from "./components/InputBox/InputBox";
export const Index = () => {
  return (
    <View style={styles.container}>
      <Chat />
      <InputBox />
      <StatusBar backgroundColor="blue" style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingVertical: 70,
  },
});
