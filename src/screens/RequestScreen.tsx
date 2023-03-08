import { FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { RequestComponent } from "../components/Contacts/Request";
import Colors from "../constants/Colors";

export const RequestScreen = () => {
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);
  const notEmpty = contactRequest.length > 0;
  return (
    <>
      {notEmpty ? (
        <FlatList
          data={contactRequest}
          renderItem={({ item }) => {
            return <RequestComponent requestUser={item} />;
          }}
        />
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
