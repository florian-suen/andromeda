import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { ChatList } from "../screens/ChatsList/ChatsListScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { ContactScreen } from "../screens/ContactScreen";
import { BlogScreen } from "../screens/BlogScreen";
import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Icon, Icons } from "../components/Icon/Icon";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import React from "react";
import colors from "../constants/Colors";

const tabArray = [
  {
    route: "Chats",
    label: "Chats",
    type: Icons.Ionicons,
    activeIcon: "chatbox",
    inActiveIcon: "chatbox-outline",
    component: ChatList,
  },
  {
    route: "Contacts",
    label: "Contacts",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "contacts",
    inActiveIcon: "contacts-outline",
    component: ContactScreen,
  },
  {
    route: "Moments",
    label: "Moments",
    type: Icons.Ionicons,
    activeIcon: "rocket",
    inActiveIcon: "rocket-outline",
    component: BlogScreen,
  },
  {
    route: "Account",
    label: "Account",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "card-account-details",
    inActiveIcon: "card-account-details-outline",
    component: AccountScreen,
  },
];
const TabButton = ({
  item,
  accessibilityState,
  onPress,
}: {
  item: typeof tabArray[0];
  accessibilityState: BottomTabBarButtonProps["accessibilityState"];
  onPress: BottomTabBarButtonProps["onPress"];
}) => {
  const focused = accessibilityState && accessibilityState.selected;
  const viewRef = useRef();
  const inputScale = useRef(new Animated.Value(1)).current;
  let inputOpacity = useRef(
    focused ? new Animated.Value(1) : new Animated.Value(0.2)
  );
  let color = useRef(colors.tertiary);
  if (color.current !== colors.tertiary && focused === false)
    (color.current = colors.tertiary),
      (inputOpacity.current = new Animated.Value(0.2));
  if (focused) color.current = colors.accent;

  useEffect(() => {
    const scaleTiming = () =>
      Animated.timing(inputScale, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }).start();
    const opacityTiming = () =>
      Animated.timing(inputOpacity.current, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    const revertScaleTiming = () =>
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    const revertOpacityTiming = () =>
      Animated.timing(inputOpacity.current, {
        toValue: 0.2,
        duration: 300,
        useNativeDriver: true,
      }).start();

    if (focused) opacityTiming(), scaleTiming();
    else {
      revertOpacityTiming();
      revertScaleTiming();
    }
  }, [focused]);

  return (
    <Pressable onPress={onPress} style={styles.navContainer}>
      <Animated.View
        ref={viewRef}
        style={{
          transform: [{ scale: inputScale }],
          opacity: inputOpacity.current,
        }}
      >
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={color.current}
        />
      </Animated.View>
    </Pressable>
  );
};

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route, navigation }) => {
        return {
          header: ({ route }) => {
            return (
              <View style={styles.headerContainer}>
                <Text
                  style={{
                    fontSize: 40,
                    height: 200,
                    width: 200,
                    fontFamily: "Chakra",
                  }}
                >
                  {route.name}
                </Text>

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
              </View>
            );
          },

          tabBarLabel: ({ focused, color }) => {
            return focused ? (
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginBottom: 5,
                  marginTop: -5,
                  height: 10,
                  width: 10,
                }}
              >
                {route.name}
              </Text>
            ) : null;
          },
          headerTitleAlign: "center",
          tabBarStyle: {
            position: "absolute",
            marginBottom: 30,
            marginHorizontal: 40,
            borderRadius: 5,
          },
        };
      }}
    >
      {tabArray.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: ({ accessibilityState, onPress }) => (
                <TabButton
                  accessibilityState={accessibilityState}
                  onPress={onPress}
                  item={item}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    height: 100,
    backgroundColor: colors.secondary,
    flexDirection: "row",
  },
});
