import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatContacts } from "../screens/ChatContactsScreen";
import { TabNavigator } from "./TabNavigator";
import { GroupChatScreen } from "../screens/GroupChatScreen";
import { AddContactsScreen } from "../screens/AddNewContactScreen";
import { QRCodeScreen } from "../screens/QRCodeScreen";
import { View } from "react-native";
import { ScanScreen } from "../screens/ScanScreen";
import { AddFriendScreen } from "../screens/AddFriend/AddFriendScreen";
import { ContactProfileScreen } from "../screens/ContactProfileScreen";
import { AddBlogScreen } from "../screens/AddBlogScreen";
import Colors from "../constants/Colors";
export const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const myTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      background: "transparent",
      text: "#B2A59F",
      border: Colors.secondary,
      card: Colors.secondary,
      notification: "red",
    },
  };

  const screenArray = [
    {
      route: "Home",
      label: "Home",
      component: TabNavigator,
      options: { headerShown: false },
    },
    {
      route: "GroupChat",
      label: "Group Chat",
      component: GroupChatScreen,
      options: {
        headerTitleAlign: "left" as "left",
      },
    },
    {
      route: "SelectContacts",
      label: "Select Contacts",
      component: ChatContacts,
    },
    {
      route: "AddNewContact",
      label: "Add New Contact",
      component: AddContactsScreen,
    },
    {
      route: "QRCode",
      label: "QRCode",
      component: QRCodeScreen,
      options: {
        headerTransparent: true,
        title: "",
      },
    },
    {
      route: "Scan",
      label: "Scan",
      component: ScanScreen,
      options: { headerTransparent: true, title: "" },
    },
    {
      route: "ContactProfile",
      label: "Contact Profile",
      component: ContactProfileScreen,
      options: { headerTransparent: true, title: "" },
    },
    {
      route: "AddFriend",
      label: "Add Friend",
      component: AddFriendScreen,
    },
    {
      route: "AddBlog",
      label: "Create Blog",
      component: AddBlogScreen,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={myTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Chakra",
              color: Colors.accentDark,
            },
            headerTitleAlign: "center",
          }}
        >
          {screenArray.map((item) => {
            return (
              <Stack.Screen
                key={item.label}
                name={item.route}
                component={item.component}
                options={{ ...item.options, title: item.label }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
