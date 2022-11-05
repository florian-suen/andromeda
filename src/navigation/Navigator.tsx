import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from "../screens/Chat";
import { ChatContacts } from "../screens/ChatContacts";
import { TabNavigator } from "./TabNavigator";
export const Navigator = () => {
  const Stack = createNativeStackNavigator();

  const myTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: "#c2bdb6",
      background: "#141A26",
      text: "#212020",
      border: "green",
      card: "#2E3D59",
      notification: "blue",
    },
  };

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerTitleAlign: "left",
            headerTitleStyle: { color: "#c2bdb6" },
          }}
        />
        <Stack.Screen name="ChatContacts" component={ChatContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
