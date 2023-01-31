import { View, StyleSheet, TextInput, Text, Button, Image } from "react-native";
import { createUserContact, getUserByInviteId } from "./queries";
import { API, graphqlOperation } from "aws-amplify";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ContactType } from "../../redux/contactList/contactListSlice";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useDebouncedSearch } from "../../../utility/useDebouncedSearch";

type RouteParam = {
  AddFriend: {
    currentUser: ContactType;
  };
};

interface userByInviteId {
  userByInviteId: {
    items: inviteUser[];
  };
}
type inviteUser = {
  id: string;
  username: string;
  status: string;
  image: string;
  inviteId: string;
};

export const AddFriendScreen = () => {
  const { inputText, setInputText, searchResults } = useInviteCodeSearch();

  const route = useRoute<RouteProp<RouteParam>>();

  const addFriendHandler = () => {
    API.graphql(
      graphqlOperation(createUserContact, {
        input: {
          userID: route.params.currentUser,
          friendID: searchResults.result.id,
        },
      })
    );
  };
  return (
    <View style={styles.container}>
      <Text>Please input an Invite Code to Add a new friend</Text>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        style={styles.inputText}
        placeholder="Add Friend"
      />
      {!Array.isArray(searchResults.result) && searchResults.result && (
        <View>
          <Text>{`Invite ID: ${searchResults.result.inviteId}`}</Text>
          <Image
            style={{ height: 200, width: 200 }}
            source={{ uri: searchResults.result.image }}
          />
          <Text>{`Username: ${searchResults.result.username}`}</Text>
          <Text>{`Status: ${searchResults.result.status}`}</Text>
          <Button title="Add Friend" onPress={addFriendHandler} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputText: {
    backgroundColor: "white",
    height: 33,
    marginTop: 20,
    padding: 0,
  },
});

const inviteCodeValid: (
  inviteID: string
) => Promise<inviteUser | null> = async (inviteId) => {
  const fetchUser = await API.graphql(
    graphqlOperation(getUserByInviteId, { inviteId })
  );
  const fetchedUser: GraphQLResult<userByInviteId> | null =
    "data" in fetchUser ? fetchUser : null;
  if (fetchedUser && fetchedUser.data?.userByInviteId.items.length)
    return fetchedUser.data.userByInviteId.items[0];
  return null;
};

const useInviteCodeSearch = () =>
  useDebouncedSearch((text) => inviteCodeValid(text));
