import { FlatList } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { RequestComponent } from "../components/Contacts/Request";

export const RequestScreen = () => {
  const contactRequest = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "REQUESTED" && !item.sender);

  return (
    <FlatList
      data={contactRequest}
      renderItem={({ item }) => {
        return <RequestComponent requestUser={item} />;
      }}
    />
  );
};
