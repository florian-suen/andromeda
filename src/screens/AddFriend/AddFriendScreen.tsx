import { View, StyleSheet, TextInput, Text, Button, Image } from "react-native";
import {
  createUserContact,
  getUserByInviteId,
  updateUserContact,
} from "./queries";
import { API, graphqlOperation } from "aws-amplify";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  addFriendRequest,
  ContactType,
  updateFriendStatus,
} from "../../redux/contactList/contactListSlice";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useDebouncedSearch } from "../../../utility/useDebouncedSearch";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { UseAsyncReturn } from "react-async-hook";
import { useRef } from "react";

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
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RouteParam>>();
  const justAddedRef = useRef(false);
  const addFriendHandler = async (userContact?: ContactType) => {
    if (userContact) {
      const updateContact = await API.graphql(
        graphqlOperation(updateUserContact, {
          input: {
            id: userContact.id,
            requestStatus: "ACCEPTED",
            _version: userContact._version,
          },
        })
      );
      justAddedRef.current = true;
      dispatch(
        updateFriendStatus({
          id: userContact.id,
          requestStatus: "ACCEPTED",
          version: userContact._version,
        })
      );

      API.graphql(
        graphqlOperation(updateUserContact, {
          input: {
            id: userContact.userContact.id,
            requestStatus: "ACCEPTED",
            _version: userContact.userContact._version,
          },
        })
      );

      return;
    }

    const createContactUser = await API.graphql(
      graphqlOperation(createUserContact, {
        input: {
          userID: route.params.currentUser.id,
          friendID: searchResults.result.id,
          requestStatus: "REQUESTED",
          sender: true,
        },
      })
    );

    if ("data" in createContactUser) {
      dispatch(
        addFriendRequest(
          createContactUser.data.createUserContact as ContactType
        )
      );

      const createContactFriend = await API.graphql(
        graphqlOperation(createUserContact, {
          input: {
            userID: searchResults.result.id,
            friendID: route.params.currentUser.id,
            requestStatus: "REQUESTED",
            sender: false,
            userContactUserContactId:
              createContactUser.data.createUserContact.id,
          },
        })
      );

      if ("data" in createContactFriend) {
        const updateContact = API.graphql(
          graphqlOperation(updateUserContact, {
            input: {
              id: createContactUser.data.createUserContact.id,
              userContactUserContactId:
                createContactFriend.data.createUserContact.id,
              _version: createContactUser.data.createUserContact._version,
            },
          })
        );
      }
    }
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
          <AddButton
            contacts={contacts}
            searchResults={searchResults}
            currentUserId={route.params.currentUser.id}
            addFriendHandler={addFriendHandler}
            justAdded={justAddedRef.current}
          />
        </View>
      )}
      {searchResults.result === null && <Text>No results found</Text>}
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

const AddButton = ({
  currentUserId,
  contacts,
  searchResults,
  addFriendHandler,
  justAdded,
}: {
  currentUserId: string;
  contacts: ContactType[] | [];
  searchResults: UseAsyncReturn<any, (string | ((...args: any[]) => any))[]>;
  addFriendHandler: (userContact?: ContactType) => void;
  justAdded: boolean;
}) => {
  const contactIdArray =
    contacts.length && contacts.map((item) => item.friend.id);

  if (searchResults.status === "success" && searchResults.result) {
    if (searchResults.result.id === currentUserId)
      return <Button title="Unable to add yourself" disabled />;

    if (
      contactIdArray &&
      contactIdArray.some((id) => searchResults.result.id === id)
    ) {
      const friend = contacts.find(
        (item) => searchResults.result.id === item.friend.id
      );

      switch (friend?.requestStatus) {
        case "REQUESTED":
          return friend.sender ? (
            <Button title="Requested" disabled />
          ) : (
            <Button
              title="Add Friend"
              onPress={() => addFriendHandler(friend)}
            />
          );
        case "BLOCKED":
          return <Button title="Blocked" disabled />;
        case "ACCEPTED":
          return (
            <Button title={justAdded ? "Added" : "Already Friends"} disabled />
          );
      }
    }
  }

  return <Button title="Add Friend" onPress={() => addFriendHandler()} />;
};
