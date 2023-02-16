import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navigator } from "./navigation/Navigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export const Index = () => {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style="dark" />
    </Provider>
  );
};
