import { StatusBar } from "expo-status-bar";
import { Navigator } from "./navigation/Navigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/Colors";

export const Index = () => {
  const [fontsLoaded] = useFonts({
    Exo2: require("../assets/fonts/Exo2-VariableFont_wght.ttf"),
    Zilla: require("../assets/fonts/ZillaSlab-Medium.ttf"),
    Chakra: require("../assets/fonts/ChakraPetch-SemiBold.ttf"),
  });

  return (
    <Provider store={store}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 1, y: 0.4 }}
        end={{ x: 0.5, y: 1.5 }}
        style={{ flex: 1 }}
      >
        {fontsLoaded ? <Navigator /> : null}
        <StatusBar style="dark" />
      </LinearGradient>
    </Provider>
  );
};
