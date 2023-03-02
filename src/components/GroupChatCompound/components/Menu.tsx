import { BlurView } from "expo-blur";
import React, { useContext } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ChatGroupType } from "../../../redux/chatGroup/chatGroupSlice";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../context";
export const Menu = () => {
  const {
    chatGroup: { chatGroupData },
    navigation,
    delete: { removeUserHandler },
    user: { users, leaderId },
    modal: { modalVisible, setModalVisible },
  } = useContext(UserContext);

  const newUsers = ([] as ChatGroupType["Chatgroup"]["users"]["items"]).concat(
    users
  );

  const sortedUsers = newUsers.sort((user) => {
    if (user.user.id === leaderId) return -1;
    return 0;
  });
  const filteredUsers = sortedUsers.filter((user) => !user._deleted);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setModalVisible(!modalVisible)}
      ></Pressable>
      <BlurView intensity={100} style={styles.modalContainer}>
        <Text
          style={{
            fontFamily: "Chakra",
            color: "oldlace",
            fontSize: 18,
            fontWeight: "500",
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          Users
        </Text>
        <FlatList
          data={filteredUsers}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.menuContainer}>
                  <Image
                    source={{ uri: item.user.image! }}
                    style={styles.image}
                  />
                  {index === 0 && leaderId ? (
                    <Text style={styles.menuName}>
                      {item.user.username}(Owner)
                    </Text>
                  ) : (
                    <Text style={styles.menuName}>{item.user.username}</Text>
                  )}
                </View>
                {leaderId ? (
                  <FontAwesome
                    onPress={() =>
                      Alert.alert(
                        "Removing User",
                        `Are you sure that you want to remove ${item.user.username} from this group?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Remove",
                            style: "destructive",
                            onPress: () => removeUserHandler(item),
                          },
                        ]
                      )
                    }
                    name="remove"
                    size={24}
                    color="black"
                  />
                ) : null}
              </>
            );
          }}
        ></FlatList>
        <View style={{ marginTop: 15 }}>
          <Button
            color={Colors.secondary}
            title="Add Friends to Group"
            accessibilityLabel="Adding Friends Button"
            onPress={() => {
              setModalVisible(false);
              navigation!.navigate("AddNewContact", {
                chatGroupId: chatGroupData.id,
                chatGroup: chatGroupData,
              });
            }}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  menuName: { color: "#fff5ee", fontFamily: "Exo2" },
  menuContainer: { flexDirection: "row", padding: 8 },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.5,
  },
  modalContainer: {
    margin: 75,
    backgroundColor: " Colors.accent",
    borderRadius: 5,
    padding: 20,
  },
});
