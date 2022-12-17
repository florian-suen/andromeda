import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navigator } from "./navigation/Navigator";
import { Provider } from "react-redux";

export const Index = () => {
  return (
    <Provider store={null}>
      <View style={styles.container}>
        <Navigator />
        <StatusBar style="dark" />
      </View>{" "}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
