import { FlatList } from "react-native";
import { useAppSelector } from "../../utility/useReduxHooks";
import { BlockedComponent } from "../components/Contacts/Blocked";

export const BlockedScreen = () => {
  const contactBlocked = useAppSelector((state) => {
    return state.contacts.contacts;
  }).filter((item) => item.requestStatus === "BLOCKED" && item.sender);
  return (
    <FlatList
      data={contactBlocked}
      renderItem={({ item }) => {
        return <BlockedComponent requestUser={item} />;
      }}
    />
  );
};
