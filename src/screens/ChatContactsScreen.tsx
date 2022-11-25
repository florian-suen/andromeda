import { useState, useEffect, useRef } from "react";
import {
  Pressable,
  Text,
  FlatList,
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
import { graphqlOperation, API, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { User } from "../models/index";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "../../utility/useStyles";

type RootStackParamList = {
  Chat: { chatGroupId: string; username: string };
};

export const ChatContacts = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const [isSelectable, setIsSelectable] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const createGroupOpacity = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const createGroupHandler = async () => {
    const newChatGroupResp = await API.graphql(
      graphqlOperation(createChatGroup, { input: {} })
    );

    if ("data" in newChatGroupResp && !newChatGroupResp.data?.createChatGroup)
      console.log("Error creating chatgroup");

    const newChatGroup =
      "data" in newChatGroupResp && newChatGroupResp.data?.createChatGroup;

    await Promise.all(
      selectedUserId.map((userId) => {
        API.graphql(
          graphqlOperation(createUserChatGroup, {
            input: { chatgroupID: newChatGroup.id, userID: userId },
          })
        );
      })
    );

    const userAuth = await Auth.currentAuthenticatedUser();

    await API.graphql(
      graphqlOperation(createUserChatGroup, {
        input: {
          chatgroupID: newChatGroup.id,
          userID: userAuth.attributes.sub,
        },
      })
    );

    navigation.navigate("Chat", {
      chatGroupId: newChatGroup.id,
      username: userAuth.attributes.email,
    });

    setIsSelectable(false);
    setSelectedUserId([]);
  };

  const contactSelectHandler = (id: string) => {
    setSelectedUserId((userIds) => {
      if (userIds.includes(id))
        return [...userIds].filter((user) => user !== id);
      return [...userIds, id];
    });
  };

  useEffect(() => {
    const api = API.graphql(graphqlOperation(listUsers));
    if ("then" in api)
      api.then((results) => {
        return setUsers(results.data?.listUsers?.items);
      });
  }, []);

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
        data={users}
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
              <ChatContactsComponent
                onSelectHandler={() => contactSelectHandler(item.id)}
                user={item}
                isSelectable={isSelectable}
                isSelected={isSelected}
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
            onPress={createGroupHandler}
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
