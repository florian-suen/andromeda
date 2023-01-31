import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ContactsComponent } from "../components/Contacts/Contacts";
import { useThemeColor } from "../../utility/useStyles";
import { useAppSelector } from "../../utility/useReduxHooks";
import { useContext } from "react";
import { userContext } from "../../utility/userAuth";
import { ContactType } from "../redux/contactList/contactListSlice";

type RootStackParamList = {
  AddFriend: { currentUser: ContactType };
};

export const ContactScreen = () => {
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const [isSelectable, setIsSelectable] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const createGroupOpacity = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const userAuth = useContext(userContext);
  const getContactList = useAppSelector((state) => {
    return state.contacts.contacts;
  });

  const contactList = getContactList.filter(
    (item) => userAuth && item.id !== userAuth.attributes.sub
  );
  const currentUser = getContactList.find(
    (item) => userAuth && item.id === userAuth.attributes.sub
  )!;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const contactSelectHandler = (id: string) => {
    setSelectedUserId((userIds) => {
      if (userIds.includes(id))
        return [...userIds].filter((user) => user !== id);
      return [...userIds, id];
    });
  };

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
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={contactList}
        renderItem={({ item, index }) => {
          const isSelected = selectedUserId.includes(item.id);
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
              <Octicons
                name="person-add"
                size={24}
                color="black"
                onPress={() =>
                  navigation.navigate("AddFriend", { currentUser })
                }
              />
              <ContactsComponent
                onSelectHandler={() => contactSelectHandler(item.id)}
                user={item}
                isSelectable={isSelectable}
                isSelected={isSelected}
                currentUser={currentUser}
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
