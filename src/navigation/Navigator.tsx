import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatContacts } from "../screens/ChatContactsScreen";
import { TabNavigator } from "./TabNavigator";
import { GroupChatScreen } from "../screens/GroupChatScreen";
import { AddContacts } from "../screens/AddNewContactScreen";
import { QRCodeScreen } from "../screens/QRCode";
import { View } from "react-native";
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
    <View style={{ flex: 1 }}>
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
            name="GroupChat"
            component={GroupChatScreen}
            options={{
              headerTitleAlign: "left",
            }}
          />

          <Stack.Screen name="Select Contacts" component={ChatContacts} />

          <Stack.Screen name="AddNewContact" component={AddContacts} />

          <Stack.Screen
            options={{ headerTransparent: true, title: "" }}
            name="QRCode"
            component={QRCodeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
