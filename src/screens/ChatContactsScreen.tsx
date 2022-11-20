import { useState, useEffect, useRef } from "react";
import {
  Pressable,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  View,
} from "react-native";
import { ChatContactsComponent } from "../components/ChatContacts/ChatContacts";
import { graphqlOperation, API } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { User } from "../models/index";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "../../utility/useStyles";

export const ChatContacts = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create(useThemeColor(styleSheet));
  const [isSelectable, setIsSelectable] = useState(false);
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

  return (
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
        <Pressable
          android_ripple={{ color: "#222b3d" }}
          style={styles.iconHeader}
          onPress={() => {
            setTimeout(() => setSelectedUserId([]), 500),
              setIsSelectable(!isSelectable);
          }}
        >
          <FontAwesome
            name="group"
            size={25}
            color="white"
            style={styles.groupIcon}
          />
          <Text style={styles.iconText}>Create Group</Text>
        </Pressable>
      }
    ></Animated.FlatList>
  );
};

const styleSheet = {
  container: { alignItems: "center", justifyContent: "center" },
  iconHeader: {
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
  iconText: {
    color: "primary",
    fontWeight: "bold",
  },
};
