import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlockedScreen } from "../screens/BlockedScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { RequestScreen } from "../screens/RequestScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useAppSelector } from "../../utility/useReduxHooks";
import { Text } from "react-native";
const Tab = createMaterialTopTabNavigator();

export const ContactNavigator = () => {
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.accent }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="md-home" size={20} color={Colors.accent} />
            ) : (
              <Ionicons
                name="md-home-outline"
                style={{ opacity: 0.3 }}
                size={20}
                color={Colors.accent}
              />
            );
          },
        }}
        name="Contacts"
        component={ContactScreen}
      />
      <Tab.Screen
        options={{
          tabBarBadge: () => {
            return (
              contactRequest.length > 0 && (
                <Text style={{ color: "white" }}>{contactRequest.length}</Text>
              )
            );
          },
        }}
        name="Request"
        component={RequestScreen}
      />
      <Tab.Screen name="Blocked" component={BlockedScreen} />
    </Tab.Navigator>
  );
};
