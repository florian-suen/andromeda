import { Auth } from "aws-amplify";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Chip, TextInput, Switch, Button } from "react-native-paper";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../utility/useReduxHooks";
import Colors from "../constants/Colors";
import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { useRef, useState } from "react";
import { Dispatch } from "../components/Contacts/Contacts";
import { updateStatus } from "../redux/currentUser/currentUserSlice";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavParam = { QRCode: {} };

export const AccountScreen = () => {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [openStatus, setOpenStatus] = useState(false);
  const statusText = useRef("");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<NavParam>>();
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
            }}
          >
            <Image
              style={styles.profileImage}
              source={{ uri: currentUser.image }}
            />
            <View style={{ marginTop: 7, flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 20,
                      color: "whitesmoke",
                      fontFamily: "Exo2Bold",
                    },
                  ]}
                >
                  {currentUser.username}
                </Text>

                <FontAwesome
                  onPress={() => {
                    navigation.navigate("QRCode", {});
                  }}
                  style={{
                    position: "absolute",
                    right: 21,
                    top: 0,
                  }}
                  name="qrcode"
                  size={28}
                  color={Colors.attachBoxOne}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.userInvite}>
                  Invite ID: {currentUser.inviteId}
                </Text>
                <Ionicons
                  onPress={() => {
                    Clipboard.setStringAsync(currentUser.inviteId).then(
                      (done) => {
                        done &&
                          Toast.show("Copied Invite Code to Clipboard", {
                            duration: Toast.durations.LONG,
                            position: -60,
                            shadow: true,
                            backgroundColor: Colors.info,
                            textStyle: {
                              fontFamily: "Exo2",
                            },
                          });
                      }
                    );
                  }}
                  style={{ marginLeft: 10 }}
                  name="copy"
                  size={18}
                  color={Colors.accentDark}
                />
              </View>
              {openStatus ? (
                <View>
                  <TextInput
                    onSubmitEditing={(e) => {
                      changeStatusHandler(
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
                </View>
              ) : (
                <View>
                  <Chip
                    compact
                    onPress={() => {
                      setOpenStatus(true);
                    }}
                    style={{
                      position: "absolute",
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
                </View>
              )}
            </View>
          </View>
        </View>
        <Button
          icon={() => (
            <FontAwesome
              name="user-circle"
              size={20}
              color={Colors.info}
              style={[styles.buttonIcon, { marginLeft: 2, marginRight: 6 }]}
            />
          )}
          buttonColor={Colors.secondary}
          contentStyle={{
            justifyContent: "flex-start",
          }}
          labelStyle={styles.buttonText}
          style={[
            styles.button,
            { marginTop: 8, borderTopWidth: StyleSheet.hairlineWidth },
          ]}
          mode="contained"
        >
          Change Profile Picture
        </Button>
        <Button
          labelStyle={styles.buttonText}
          contentStyle={{
            justifyContent: "flex-start",
          }}
          icon={() => (
            <MaterialCommunityIcons
              color={Colors.info}
              name="rename-box"
              size={24}
              style={styles.buttonIcon}
            />
          )}
          buttonColor={Colors.secondary}
          style={styles.button}
          mode="contained"
        >
          Edit Name
        </Button>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            labelStyle={styles.buttonText}
            contentStyle={{
              justifyContent: "flex-start",
            }}
            icon={() => (
              <MaterialCommunityIcons
                color={Colors.info}
                name="security"
                size={24}
                style={styles.buttonIcon}
              />
            )}
            buttonColor={Colors.secondary}
            style={[styles.button, { flex: 1 }]}
            mode="contained"
          >
            Security
          </Button>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.lightGray}
            style={{ position: "absolute", right: 15 }}
          />
        </View>
        <Pressable
          android_ripple={{ color: Colors.gray }}
          onPress={() => setIsSwitchOn(!isSwitchOn)}
          style={[
            styles.button,
            {
              marginBottom: 18,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.secondary,
            },
          ]}
        >
          <MaterialIcons
            style={{ marginLeft: 16, marginRight: 13 }}
            name="brightness-4"
            size={24}
            color={Colors.info}
          />
          <Text style={styles.buttonText}>Dark Mode</Text>
          <View
            style={{
              flex: 1,
              marginRight: 15,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Switch
              style={{ alignSelf: "flex-end" }}
              value={isSwitchOn}
              onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            />
          </View>
        </Pressable>
        <Button
          buttonColor={Colors.danger}
          style={styles.button}
          mode="contained"
          onPress={() => signOut()}
        >
          Sign-Out
        </Button>
      </View>
    </>
  ) : null;
};
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

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
    minWidth: 90,
    position: "absolute",
    fontFamily: "Exo2",
    fontSize: 12,
    height: 26,
    backgroundColor: "transparent",
  },
  button: {
    justifyContent: "center",
    borderRadius: 0,
    height: 45,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.info,
  },
  buttonText: { color: Colors.accent, fontFamily: "Exo2", fontSize: 16 },
  buttonIcon: { marginRight: 5 },
});

const changeStatusHandler = async (
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
