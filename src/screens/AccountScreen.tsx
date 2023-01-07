import { Auth } from "aws-amplify";
import { Button, View, StyleSheet } from "react-native";
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export const Account = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} title="Sign-out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
