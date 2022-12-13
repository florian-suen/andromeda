import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navigator } from "./navigation/Navigator";
import { useContext } from "react";
import { getUserAuth, userContext } from "../utility/userAuth";

export const Index = () => {
  console.log("lol", useContext(userContext));
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
