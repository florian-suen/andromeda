import { FlatList, View, Text } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlockedComponent } from "../components/Contacts/Blocked";
import Colors from "../constants/Colors";

export const BlockedScreen = () => {
  const contactBlocked = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "BLOCKED" && item.sender);
  return (
    <>
      {contactBlocked.length > 0 ? (
        <FlatList
          data={contactBlocked}
          renderItem={({ item }) => {
            return <BlockedComponent requestUser={item} />;
          }}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text
            style={{ fontSize: 18, fontFamily: "Exo2", color: Colors.accent }}
          >
            You have no users that are Blocked
          </Text>
        </View>
      )}
    </>
  );
};
