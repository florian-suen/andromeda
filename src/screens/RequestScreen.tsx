import { FlatList, Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { RequestComponent } from "../components/Contacts/Request";
import Colors from "../constants/Colors";
import { Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
export const RequestScreen = () => {
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);

  const userRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && item.sender);

  const contactReqNotEmpty = contactRequest.length > 0;
  const userReqNotEmpty = userRequest.length > 0;
  return (
    <>
      {contactReqNotEmpty || userReqNotEmpty ? (
        <>
          {contactReqNotEmpty && (
            <View>
              <Text style={styles.headerText}>Incoming</Text>
              <Divider horizontalInset style={styles.divider} />
              <BlurView
                style={{ margin: 5, marginHorizontal: 12, borderRadius: 3 }}
                intensity={20}
              >
                <FlatList
                  data={contactRequest}
                  renderItem={({ item }) => {
                    return <RequestComponent requestUser={item} />;
                  }}
                />
              </BlurView>
            </View>
          )}
          {userReqNotEmpty && (
            <View>
              <Text style={styles.headerText}> Outgoing </Text>
              <Divider horizontalInset style={styles.divider} />
              <BlurView
                style={{ margin: 5, marginHorizontal: 12, borderRadius: 3 }}
                intensity={20}
              >
                <FlatList
                  data={userRequest}
                  renderItem={({ item }) => {
                    return <RequestComponent requestUser={item} />;
                  }}
                />
              </BlurView>
            </View>
          )}
        </>
      ) : (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text
            style={{ fontSize: 18, fontFamily: "Exo2", color: Colors.accent }}
          >
            You have currently no Requests
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Zilla",
    fontSize: 25,
    padding: 5,
    color: Colors.accent,
    marginLeft: 10,
  },
  divider: { padding: 0.5, marginBottom: 3 },
});
