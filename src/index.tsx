import { StatusBar } from "expo-status-bar";
import { Navigator } from "./navigation/Navigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";

export const Index = () => {
  const [fontsLoaded] = useFonts({
    Exo2: require("../assets/fonts/Exo2-VariableFont_wght.ttf"),
    Zilla: require("../assets/fonts/ZillaSlab-Medium.ttf"),
    Chakra: require("../assets/fonts/ChakraPetch-SemiBold.ttf"),
  });

  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style="dark" />
    </Provider>
  );
};
