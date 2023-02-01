import { useState, useEffect, useRef, useContext } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Button,
} from "react-native";
import {
  createUserChatGroup,
  createChatGroup,
} from "../../src/graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatContactsComponent } from "../components/ChatContacts/ChatContacts";
import { graphqlOperation, API } from "aws-amplify";
import { User } from "../models/index";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "../../utility/useStyles";
import { UserAuth, userContext } from "../../utility/userAuth";
import { useAppDispatch, useAppSelector } from "../../utility/useReduxHooks";
import { createNewChatGroup } from "../redux/chatGroup/chatGroupSlice";
import { v4 as uuidv4 } from "uuid";
import { ContactType } from "../redux/contactList/contactListSlice";

type RootStackParamList = {
  GroupChat: { chatGroupId: string };
};

type dispatch = ReturnType<typeof useAppDispatch>;

export const ChatContacts = () => {
  const userAuth = useContext(userContext);
  const dispatch = useAppDispatch();
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const [isSelectable, setIsSelectable] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const createGroupOpacity = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getContactList = useAppSelector((state) => {
    return state.contacts.contacts;
  });

  const contactList = getContactList.filter(
    (item) => userAuth && item.friend.id !== userAuth.attributes.sub
  );

  const contactSelectHandler = (id: string) => {
    setSelectedUserId((userIds) => {
      if (userIds.includes(id))
        return [...userIds].filter((user) => user !== id);
      return [...userIds, id];
    });
  };

  const chatGroupHandler = createChatGroupHandler(
    getContactList,
    userAuth!,
    navigation,
    selectedUserId,
    setSelectedUserId,
    setIsSelectable,
    dispatch
  );

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
              <ChatContactsComponent
                onSelectHandler={() => contactSelectHandler(item.friend.id)}
                user={item.friend}
                isSelectable={isSelectable}
                isSelected={isSelected}
                chatGroupHandler={chatGroupHandler}
              />
            </Animated.View>
          );
        }}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Pressable
              disabled={isSelectable}
              android_ripple={{ color: "#222b3d" }}
              style={styles.groupIconContainer}
              onPress={() => {
                setIsSelectable(true);
              }}
            >
              <FontAwesome
                name="group"
                size={25}
                color="white"
                style={styles.groupIcon}
              />
              <Text style={styles.iconText}>
                {isSelectable ? "Pick 1 or more Contacts" : "Create Group"}
              </Text>
            </Pressable>

            {isSelectable ? (
              <Pressable
                style={styles.cancelIconContainer}
                android_ripple={{ color: "#222b3d" }}
                onPress={() => {
                  setTimeout(() => setSelectedUserId([]), 0),
                    setIsSelectable(false);
                }}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </Pressable>
            ) : null}
          </View>
        }
      ></Animated.FlatList>
      {selectedUserId.length ? (
        <Animated.View style={{ opacity: createGroupOpacity }}>
          <Button
            disabled={selectedUserId.length < 1}
            color="royalblue"
            onPress={() => chatGroupHandler()}
            title="Create Group"
          />
        </Animated.View>
      ) : null}
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

function createChatGroupHandler(
  users: ContactType[],
  userAuth: UserAuth,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  selectedUserId: string[],
  setSelectedUserId: React.Dispatch<React.SetStateAction<string[]>>,
  setIsSelectable: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: dispatch
) {
  return async (user?: User) => {
    const chatGroupId: string = uuidv4();
    let userNames, usersArray;

    if (user) {
      const friendUser = user;
      const mainUser = users.find(
        (user) => user.friend.id === userAuth.attributes.sub
      );
      selectedUserId = [friendUser.id, userAuth.attributes.sub];
      userNames = [friendUser.username];
      usersArray = [{ user: friendUser }, { user: mainUser }];
    } else {
      selectedUserId.push(userAuth.attributes.sub);

      userNames = [];
      function* getNames() {
        for (const id of selectedUserId) {
          yield users.find((user) => user.friend.id === id)?.friend.username;
        }
      }
      for (const username of getNames()) userNames.push(username!);
      usersArray = selectedUserId
        .map((userId) => users.find((user) => user.friend.id === userId))
        .map((user) => {
          return { user };
        });
    }

    dispatch(
      createNewChatGroup({
        chatGroupId,
        userNames,
        users: usersArray as { user: User }[],
        leaderID: userAuth.attributes.sub,
      })
    );

    navigation.navigate("GroupChat", {
      chatGroupId,
    });

    const newChatGroupResp = await API.graphql(
      graphqlOperation(createChatGroup, {
        input: {
          leaderID: user ? userAuth.attributes.sub : null,
          name: `${userNames.join(" ")} ${!user ? "Group Chat" : ""} `,
          id: chatGroupId,
        },
      })
    );

    if ("data" in newChatGroupResp && !newChatGroupResp.data?.createChatGroup)
      console.log("Error creating chatgroup");

    await Promise.all(
      selectedUserId.map((userId) => {
        API.graphql(
          graphqlOperation(createUserChatGroup, {
            input: { chatgroupID: chatGroupId, userID: userId },
          })
        );
      })
    );

    if (!user) {
      setIsSelectable(false);
      setSelectedUserId([]);
    }
  };
}
