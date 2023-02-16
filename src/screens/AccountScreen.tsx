import { Auth } from "aws-amplify";
import { Button, View, StyleSheet, Text, Image } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export const AccountScreen = () => {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  return currentUser ? (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userTop}>
          <Text>{"Profile"}</Text>
        </View>
        <Image
          style={styles.profileImage}
          source={{ uri: currentUser.image }}
        />
        <Text>{currentUser.username}</Text>
        <Text>{currentUser.status}</Text>
        <Text style={styles.userInvite}>{currentUser.inviteId}</Text>
      </View>
      <Button onPress={() => signOut()} title="Sign-out" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {},
  userTop: {},
  userContainer: { backgroundColor: "yellow" },
  userInvite: { backgroundColor: "#2A1633" },
  profileImage: { height: 100, width: 100 },
});
