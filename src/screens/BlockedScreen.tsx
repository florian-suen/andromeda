import { BlurView } from "expo-blur";
import { FlatList, View, Text } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlockedComponent } from "../components/Contacts/Blocked";
import Colors from "../constants/Colors";

export const BlockedScreen = () => {
  const contactBlocked = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "BLOCKED");
  return (
    <>
      {contactBlocked.length > 0 ? (
        <BlurView
          style={{ margin: 5, marginHorizontal: 12, borderRadius: 3 }}
          intensity={8}
        >
          <FlatList
            data={contactBlocked}
            renderItem={({ item }) => {
              return <BlockedComponent requestUser={item} />;
            }}
          />
        </BlurView>
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
