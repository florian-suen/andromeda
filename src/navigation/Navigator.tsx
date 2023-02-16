import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatContacts } from "../screens/ChatContactsScreen";
import { TabNavigator } from "./TabNavigator";
import { GroupChatScreen } from "../screens/GroupChatScreen";
import { AddContacts } from "../screens/AddNewContactScreen";
import { QRCodeScreen } from "../screens/QRCodeScreen";
import { View } from "react-native";
import { ScanScreen } from "../screens/ScanScreen";
import { AddFriendScreen } from "../screens/AddFriend/AddFriendScreen";
import { ContactProfileScreen } from "../screens/ContactProfileScreen";
import { AddBlogScreen } from "../screens/AddBlogScreen";
import colors from "../constants/Colors";
export const Navigator = () => {
  const Stack = createNativeStackNavigator();

  const myTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.secondary,
      text: "#B2A59F",
      border: colors.secondary,
      card: colors.tertiary,
      notification: "red",
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

          <Stack.Screen name="SelectContacts" component={ChatContacts} />

          <Stack.Screen name="AddNewContact" component={AddContacts} />

          <Stack.Screen
            options={{ headerTransparent: true, title: "" }}
            name="QRCode"
            component={QRCodeScreen}
          />

          <Stack.Screen
            options={{ headerTransparent: true, title: "" }}
            name="Scan"
            component={ScanScreen}
          />

          <Stack.Screen
            options={{ headerTransparent: true, title: "" }}
            name="ContactProfile"
            component={ContactProfileScreen}
          />

          <Stack.Screen name="AddFriend" component={AddFriendScreen} />

          <Stack.Screen name="AddBlog" component={AddBlogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
