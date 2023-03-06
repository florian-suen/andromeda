import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlockedScreen } from "../screens/BlockedScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { RequestScreen } from "../screens/RequestScreen";

const Tab = createMaterialTopTabNavigator();

export const ContactNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contacts" component={ContactScreen} />
      <Tab.Screen name="Request" component={RequestScreen} />
      <Tab.Screen name="Blocked" component={BlockedScreen} />
    </Tab.Navigator>
  );
};
