import { Auth } from "aws-amplify";
import { Button, View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Chip, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../utility/useReduxHooks";
import Colors from "../constants/Colors";
import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { useRef, useState } from "react";
import { Dispatch } from "../components/Contacts/Contacts";
import { updateStatus } from "../redux/currentUser/currentUserSlice";
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export const AccountScreen = () => {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [openStatus, setOpenStatus] = useState(false);
  const statusText = useRef("");
  const dispatch = useAppDispatch();
  return currentUser ? (
    <>
      {openStatus && (
        <Pressable
          style={{
            position: "absolute",
            flex: 1,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 1,
          }}
          onPress={() => {
            setOpenStatus(false);
          }}
        ></Pressable>
      )}
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View
            style={{
              marginTop: "18%",
              flexDirection: "row",
              marginLeft: 30,
              marginBottom: 10,
              width: "100%",
            }}
          >
            <Image
              style={styles.profileImage}
              source={{ uri: currentUser.image }}
            />
            <View style={{ marginTop: 7 }}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 20, color: "whitesmoke", fontFamily: "Exo2Bold" },
                ]}
              >
                {currentUser.username}
              </Text>

              <Text style={styles.userInvite}>
                Invite ID: {currentUser.inviteId}
              </Text>

              {openStatus ? (
                <TextInput
                  onSubmitEditing={(e) => {
                    dispatchChangeStatus(
                      currentUser,
                      statusText.current,
                      dispatch
                    );
                    setOpenStatus(false);
                  }}
                  maxLength={20}
                  activeOutlineColor={Colors.white}
                  textColor={Colors.accent}
                  outlineStyle={{ borderColor: Colors.info, borderWidth: 1 }}
                  autoFocus
                  contentStyle={{
                    backgroundColor: "transparent",
                  }}
                  label="status"
                  mode="outlined"
                  onChangeText={(text) => {
                    statusText.current = text;
                  }}
                  onBlur={() => {
                    setOpenStatus(false);
                  }}
                  style={styles.statusInput}
                />
              ) : (
                <Chip
                  compact
                  onPress={() => {
                    setOpenStatus(true);
                  }}
                  style={{
                    borderRadius: 16,
                    borderColor: Colors.info,
                    borderWidth: 1,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    transform: [{ scale: 0.9 }, { translateX: -10 }],
                  }}
                  selectedColor={Colors.primary}
                  textStyle={styles.text}
                  icon={() => (
                    <AntDesign
                      style={{ marginTop: 1 }}
                      name="pluscircleo"
                      size={15}
                      color={Colors.info}
                    />
                  )}
                >
                  {currentUser.status}
                </Chip>
              )}
            </View>
          </View>
        </View>
        {/*  <Button onPress={() => signOut()} title="Sign-out" /> */}
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  userTop: {},
  userContainer: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  userInvite: {
    fontFamily: "Exo2",
    color: Colors.accent,
    fontSize: 14,
    marginVertical: 7,
    marginTop: 6,
  },
  profileImage: {
    marginRight: 15,
    height: 100,
    width: 100,
    borderRadius: 5,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  text: {
    fontFamily: "Exo2",
    color: Colors.accent,
    fontSize: 12,
    maxWidth: 200,
  },
  statusInput: {
    fontFamily: "Exo2",
    fontSize: 12,
    height: 26,
    backgroundColor: "transparent",
  },
});

const dispatchChangeStatus = async (
  currentUser: { _version: string; id: string; status: string },
  status: string,
  dispatch: Dispatch
) => {
  dispatch(updateStatus({ status, _version: currentUser._version }));
  try {
    const changeStatus = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: currentUser.id,
          status: status,
          _version: currentUser._version,
        },
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(
      updateStatus({
        status: currentUser.status,
        _version: currentUser._version,
      })
    );
  }
};
