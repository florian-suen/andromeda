import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatList } from "../screens/ChatsList/ChatsList";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Account } from "../screens/Account";

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
              <MaterialCommunityIcons
                name="chat-plus-outline"
                onPress={() => navigation.navigate("Select Contacts")}
                size={20}
                color=" teal"
                style={{ marginRight: 12 }}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ChatList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="people-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Moments"
        component={ChatList}
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
