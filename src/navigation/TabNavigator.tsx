import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { ChatList } from "../screens/ChatsList/ChatsListScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { BlogScreen } from "../screens/BlogScreen";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Modal,
} from "react-native";
import { Icon, Icons } from "../components/Icon/Icon";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import React from "react";
import colors from "../constants/Colors";
import Colors from "../constants/Colors";
import {
  createAnimation,
  AnimationType,
  returnAnimation,
} from "../../utility/createAnimation";
import { ContactNavigator } from "./ContactNavigator";

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
    route: "ContactsNavigator",
    label: "Contacts",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "contacts",
    inActiveIcon: "contacts-outline",
    component: ContactNavigator,
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
  const inputScale = useRef(new Animated.Value(1)).current;
  let inputOpacity = useRef(
    focused ? new Animated.Value(1) : new Animated.Value(0.2)
  );
  let color = useRef(colors.peacock);
  if (color.current !== colors.peacock && focused === false)
    (color.current = colors.peacock),
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
  const disableModalClick = useRef(false);
  const [openMenu, setOpenMenu] = useState(false);
  const cogRotate = createAnimation([
    { type: "rotate", startValue: 0, toValue: 1, duration: 1000 },
  ]);
  const interpolateRotation = cogRotate.rotate?.startValue.interpolate({
    inputRange: [0, 0.1, 0.3, 0.5, 0.7, 1],
    outputRange: ["0deg", "40deg", "0deg", "70deg", "130deg", "180deg"],
  });
  const menuAnimationOpen = createAnimation([
    { type: "opacity", startValue: 0, toValue: 1, delay: 0 },
    { type: "scale", startValue: 0, toValue: 1, delay: 0 },
    { type: "translateX", startValue: -50, toValue: 0, delay: 0 },
  ]);
  const secondMenuAnimationOpen = createAnimation([
    { type: "opacity", startValue: 0, toValue: 1, delay: 200 },
    { type: "scale", startValue: 0, toValue: 1, delay: 200 },
    { type: "translateX", startValue: -50, toValue: 0, delay: 200 },
  ]);
  const thirdMenuAnimationOpen = createAnimation([
    { type: "opacity", startValue: 0, toValue: 1, delay: 250 },
    { type: "scale", startValue: 0, toValue: 1, delay: 250 },
    { type: "translateX", startValue: -50, toValue: 0, delay: 250 },
  ]);
  const menuAnimationClose = createAnimation([
    {
      type: "opacity",
      startValue: menuAnimationOpen.opacity?.startValue!,
      toValue: 0,
      delay: 200,
    },
    {
      type: "scale",
      startValue: menuAnimationOpen.scale?.startValue!,
      toValue: 0,
      delay: 200,
    },
    {
      type: "translateX",
      startValue: menuAnimationOpen.translateX?.startValue!,
      toValue: -50,
      delay: 200,
    },
  ]);
  const secondMenuAnimationClose = createAnimation([
    {
      type: "opacity",
      startValue: secondMenuAnimationOpen.opacity?.startValue!,
      toValue: 0,
      delay: 100,
    },
    {
      type: "scale",
      startValue: secondMenuAnimationOpen.scale?.startValue!,
      toValue: 0,
      delay: 100,
    },
    {
      type: "translateX",
      startValue: secondMenuAnimationOpen.translateX?.startValue!,
      toValue: -50,
      delay: 100,
    },
  ]);
  const thirdMenuAnimationClose = createAnimation([
    {
      type: "opacity",
      startValue: thirdMenuAnimationOpen.opacity?.startValue!,
      toValue: 0,
      delay: 0,
    },
    {
      type: "scale",
      startValue: thirdMenuAnimationOpen.scale?.startValue!,
      toValue: 0,
      delay: 0,
    },
    {
      type: "translateX",
      startValue: thirdMenuAnimationOpen.translateX?.startValue!,
      toValue: -50,
      delay: 0,
    },
  ]);
  const openingAnimation = createMenuAnimation([
    menuAnimationOpen,
    secondMenuAnimationOpen,
    thirdMenuAnimationOpen,
  ]);
  const closingAnimation = createMenuAnimation(
    [thirdMenuAnimationClose, secondMenuAnimationClose, menuAnimationClose],
    setOpenMenu,
    disableModalClick
  );
  const resetAnimation = createMenuResetAnimation([
    menuAnimationClose,
    secondMenuAnimationClose,
    thirdMenuAnimationClose,
  ]);

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route, navigation }) => {
        return {
          header: ({ route, options }) => {
            options.headerTitle;
            return (
              <View style={styles.headerContainer}>
                <Text
                  style={{
                    fontSize: 25,
                    marginTop: 40,
                    fontFamily: "Chakra",
                    color: Colors.accentDark,
                  }}
                >
                  {typeof options.headerTitle === "string" &&
                    options.headerTitle}
                </Text>
                <Animated.View
                  style={{
                    position: "absolute",
                    right: 15,
                    bottom: 10,
                    transform: [
                      {
                        rotate: interpolateRotation!,
                      },
                    ],
                  }}
                >
                  <FontAwesome
                    onPress={() => {
                      cogRotate.rotate?.timing().start(({ finished }) => {
                        finished && cogRotate.rotate?.timing().reset();
                      });
                      if (openMenu === true) {
                        closingAnimation();
                        return;
                      }
                      openingAnimation();
                      setOpenMenu(true);
                    }}
                    name="cog"
                    size={25}
                    color="black"
                  />
                </Animated.View>

                <>
                  <Modal transparent={true} visible={openMenu}>
                    <Pressable
                      android_disableSound={true}
                      disabled={disableModalClick.current}
                      style={{ flex: 1 }}
                      onPress={() => {
                        !disableModalClick.current && closingAnimation();
                        disableModalClick.current = true;
                        cogRotate.rotate?.timing().start(({ finished }) => {
                          finished && cogRotate.rotate?.timing().reset();
                        });
                      }}
                    ></Pressable>

                    <View style={styles.openMenuContainer}>
                      <Pressable
                        onPress={() => {
                          setOpenMenu(false);
                          resetAnimation();
                          navigation.navigate("SelectContacts");
                        }}
                      >
                        <Animated.View
                          style={[
                            styles.openMenuText,
                            {
                              borderTopRightRadius: 5,
                              borderTopLeftRadius: 2,
                              opacity: menuAnimationOpen.opacity?.startValue,
                              transform: [
                                {
                                  translateX:
                                    menuAnimationOpen.translateX?.startValue!,
                                },
                                {
                                  scaleX: menuAnimationOpen.scale?.startValue!,
                                },
                              ],
                            },
                          ]}
                        >
                          <View
                            style={{
                              position: "absolute",
                              top: -12,
                              right: 0,
                              left: 73.5,
                              bottom: 0,
                              marginTop: 10,
                              marginHorizontal: 15,
                            }}
                          >
                            <View style={{ position: "relative", top: 0 }}>
                              <View
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: -5,
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: Colors.accent,
                                    width: 10,
                                    height: 10,
                                    transform: [{ rotate: "45deg" }],
                                  }}
                                ></View>
                              </View>
                            </View>
                          </View>

                          <MaterialCommunityIcons
                            name="chat-plus"
                            size={20}
                            color="black"
                            style={{ marginRight: 5 }}
                          />
                          <Text>New Chat</Text>
                        </Animated.View>
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          setOpenMenu(false);
                          resetAnimation();
                          navigation.navigate("AddFriend");
                        }}
                      >
                        <Animated.View
                          style={[
                            styles.openMenuText,
                            {
                              paddingLeft: 10,
                              minWidth: "100%",
                              opacity:
                                secondMenuAnimationOpen.opacity?.startValue,
                              transform: [
                                {
                                  translateX:
                                    secondMenuAnimationOpen.translateX
                                      ?.startValue!,
                                },
                                {
                                  scaleX:
                                    secondMenuAnimationOpen.scale?.startValue!,
                                },
                              ],
                            },
                          ]}
                        >
                          <Octicons
                            name="person-add"
                            style={{ marginRight: 3 }}
                            size={20}
                            color="black"
                          />
                          <Text>Add Contact</Text>
                        </Animated.View>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setOpenMenu(false);
                          resetAnimation();
                          navigation.navigate("Scan");
                        }}
                      >
                        <Animated.View
                          style={[
                            styles.openMenuText,
                            {
                              borderBottomRightRadius: 5,
                              borderBottomLeftRadius: 2,
                              minWidth: "100%",
                              opacity:
                                thirdMenuAnimationOpen.opacity?.startValue,
                              transform: [
                                {
                                  translateX:
                                    thirdMenuAnimationOpen.translateX
                                      ?.startValue!,
                                },
                                {
                                  scaleX:
                                    thirdMenuAnimationOpen.scale?.startValue!,
                                },
                              ],
                            },
                          ]}
                        >
                          <Ionicons
                            name="scan-outline"
                            size={20}
                            color="black"
                            style={{ marginRight: 5 }}
                          />
                          <Text>Scan</Text>
                        </Animated.View>
                      </Pressable>
                    </View>
                  </Modal>
                </>
              </View>
            );
          },

          tabBarLabel: ({ focused }) => {
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
              headerTitle: item.label,
              tabBarLabel: item.label,
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
    height: 90,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  openMenuContainer: {
    position: "absolute",
    width: 118,
    right: 7,
    top: 48,
  },
  openMenuText: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: Colors.accent,
    marginBottom: 0.2,
  },
});

const createMenuResetAnimation = (animationList: returnAnimation[]) => {
  return () =>
    animationList.map((aniList) => {
      Object.keys(aniList).forEach((item) => {
        aniList[item as AnimationType]!.timing().reset();
      });
    });
};

const createMenuAnimation = (
  animationList: returnAnimation[],
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>,
  disableModelClick?: React.MutableRefObject<boolean>
) => {
  return () =>
    animationList.map((aniList) => {
      Object.keys(aniList).forEach((item, index, arr) => {
        if (setOpenMenu && index === arr.length - 1) {
          aniList[item as AnimationType]!.timing().start(({ finished }) => {
            finished &&
              setTimeout(() => {
                if (disableModelClick && disableModelClick.current === true) {
                  disableModelClick.current = false;
                }
                setOpenMenu(false);
              }, 0);
          });

          return;
        }
        aniList[item as AnimationType]!.timing().start();
      });
    });
};
