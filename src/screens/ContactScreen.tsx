import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  ViewStyle,
  ImageStyle,
  TextStyle,
  FlatList,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ContactsComponent } from "../components/Contacts/Contacts";
import { useThemeColor } from "../../utility/useStyles";
import { useAppSelector } from "../../utility/useReduxHooks";
import { ContactType } from "../redux/contactList/contactListSlice";
import { RequestComponent } from "../components/Contacts/Request";
import { BlockedComponent } from "../components/Contacts/Blocked";

type RootStackParamList = {
  AddFriend: { currentUser: ContactType["friend"] };
};

export const ContactScreen = () => {
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const isSelectable = false;
  const scrollY = useRef(new Animated.Value(0)).current;
  const createGroupOpacity = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const contactList = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter(
    (item) =>
      item.requestStatus === "ACCEPTED" &&
      item.userContact.requestStatus === "ACCEPTED"
  );

  const contactBlocked = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "BLOCKED" && item.sender);
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);

  const currentUser = useAppSelector((state) => {
    return state.currentUser.currentUser;
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const createGrpOpaTiming = Animated.timing(createGroupOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });

    const revertGrpOpaTiming = Animated.timing(createGroupOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    if (selectedUserId.length) createGrpOpaTiming.start();
    if (!selectedUserId.length) revertGrpOpaTiming.start();
  }, [selectedUserId]);

  return (
    <>
      <Octicons
        name="person-add"
        size={44}
        color="black"
        onPress={() =>
          navigation.navigate("AddFriend", {
            currentUser: currentUser!,
          })
        }
      />

      <FlatList
        data={contactRequest}
        renderItem={({ item }) => {
          return <RequestComponent requestUser={item} />;
        }}
      />

      <FlatList
        data={contactBlocked}
        renderItem={({ item }) => {
          return <BlockedComponent requestUser={item} />;
        }}
      />

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={contactList}
        renderItem={({ item, index }) => {
          const isSelected = selectedUserId.includes(item.friend.id);
          const ITEM_SIZE = 80;
          const scale = scrollY.interpolate({
            inputRange: [
              -1,
              0,
              ITEM_SIZE * (index + 0.9),
              ITEM_SIZE * (index + 4),
            ],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                opacity,
                transform: [{ scale }],
              }}
            >
              <ContactsComponent
                contact={item}
                isSelectable={isSelectable}
                isSelected={isSelected}
              />
            </Animated.View>
          );
        }}
      ></Animated.FlatList>
    </>
  );
};

const styleSheet: StyleSheet.NamedStyles<{
  [p: string]: ViewStyle | ImageStyle | TextStyle;
}> = {
  container: { alignItems: "center", justifyContent: "center" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "background",
    padding: 10,
  },
  groupIcon: {
    borderRadius: 15,
    overflow: "hidden",
    padding: 10,
    marginLeft: 16,
    marginRight: 20,
  },
  cancelIconContainer: { padding: 15 },

  iconText: {
    color: "primary",
    fontWeight: "bold",
  },
};
