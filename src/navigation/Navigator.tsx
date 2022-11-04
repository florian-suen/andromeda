import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from "../screens/Chat";
import { ChatList } from "../screens/ChatsList";
import { TabNavigator } from "./TabNavigator";
export const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
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
            headerBackButtonMenuEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
