import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from "../screens/ChatScreen";
import { ChatContacts } from "../screens/ChatContactsScreen";
import { TabNavigator } from "./TabNavigator";
import { GroupChatScreen } from "../screens/GroupChatScreen";
export const Navigator = () => {
  const Stack = createNativeStackNavigator();

  const myTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: "#c2bdb6",
      background: "#1c222e",
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
          headerTitleStyle: { color: myTheme.colors.primary },
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
          }}
        />
        <Stack.Screen
          name="GroupChat"
          component={GroupChatScreen}
          options={{
            headerTitleAlign: "left",
          }}
        />

        <Stack.Screen name="Select Contacts" component={ChatContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
