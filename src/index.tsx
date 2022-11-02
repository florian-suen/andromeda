import { Chat } from "./screens/Chat";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export const Index = () => {
  return (
    <View style={styles.container}>
      <Chat />
      <StatusBar backgroundColor="blue" style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 70,
  },
});
