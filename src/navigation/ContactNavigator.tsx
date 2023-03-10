import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlockedScreen } from "../screens/BlockedScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { RequestScreen } from "../screens/RequestScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useAppSelector } from "../../utility/useReduxHooks";
import { Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export const ContactNavigator = () => {
  const route = useRoute<RouteProp<{ params: { showTabNav: boolean } }>>();
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: route.params.showTabNav ? "flex" : "none" },
        tabBarActiveTintColor: Colors.accent,
      }}
    >
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
                <View style={{}}>
                  <Text
                    style={{ color: Colors.accent, padding: 5, marginRight: 5 }}
                  >
                    {contactRequest.length}
                  </Text>
                </View>
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
