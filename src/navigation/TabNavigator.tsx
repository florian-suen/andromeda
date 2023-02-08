import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatList } from "../screens/ChatsList/ChatsListScreen";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import { Account } from "../screens/AccountScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { BlogScreen } from "../screens/BlogScreen";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarLabelStyle: { margin: 1.5 },
        headerTintColor: "#c2bdb6",
      }}
    >
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons color={color} size={size} name="chat" />
            ),
            headerRight: () => (
              <>
                <Ionicons
                  name="scan-outline"
                  size={60}
                  color="black"
                  onPress={() => navigation.navigate("Scan")}
                />
                <AntDesign
                  name="qrcode"
                  size={50}
                  color="black"
                  onPress={() => navigation.navigate("QRCode")}
                />
                <MaterialCommunityIcons
                  name="chat-plus-outline"
                  onPress={() => navigation.navigate("SelectContacts")}
                  size={20}
                  color=" teal"
                  style={{ marginRight: 12 }}
                />
              </>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="people-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Moments"
        component={BlogScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="piggy-bank"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="account-box"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
