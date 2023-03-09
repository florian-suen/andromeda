import { View, StyleSheet, TextInput, Text, Button, Image } from "react-native";
import {
  createUserContact,
  getUserByInviteId,
  updateUserContact,
} from "./queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  addFriendRequest,
  updateFriendStatus,
} from "../../redux/contactList/contactListSlice";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useDebouncedSearch } from "../../../utility/useDebouncedSearch";
import { useAppDispatch, useAppSelector } from "../../../utility/useReduxHooks";
import { UseAsyncReturn } from "react-async-hook";
import { useContext, useRef } from "react";
import { userContext } from "../../../utility/userAuth";
import Colors from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { ContactType } from "../../redux/contactList/types";
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
  const userAuth = useContext(userContext);
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
          userID: userAuth?.attributes.sub,
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
            friendID: userAuth?.attributes.sub,
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
      <View style={styles.inviteContainer}>
        <View style={styles.inviteHeader}>
          <Text style={{ color: "white", fontFamily: "Zilla" }}>
            ADD A CONTACT
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            padding: 5,
            fontFamily: "Exo2",
            marginLeft: -6,
          }}
        >
          Please enter an Invite Code to find a new contact
        </Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.inputText}
          placeholder="Find Friend"
        />
      </View>
      <View style={styles.resultsContainer}>
        {searchResults.loading && (
          <ActivityIndicator style={{ marginTop: 50 }} />
        )}
        {!Array.isArray(searchResults.result) && searchResults.result && (
          <View style={styles.mainResults}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  height: 117,
                  width: 117,
                  marginHorizontal: 10,
                  marginRight: 15,
                }}
                source={{ uri: searchResults.result.image }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.resultsTextContainer}>
                  <Text style={styles.resultsTextProp}>Username :</Text>
                  <Text style={styles.resultsText}>
                    {searchResults.result.username}
                  </Text>
                </View>
                <View style={styles.resultsTextContainer}>
                  <Text style={styles.resultsTextProp}>Status :</Text>
                  <Text style={styles.resultsText}>
                    {searchResults.result.status}
                  </Text>
                </View>

                <View style={styles.resultsTextContainer}>
                  <Text style={styles.resultsTextProp}>InviteID :</Text>
                  <Text style={styles.resultsText}>
                    {searchResults.result.inviteId}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 5,
                    justifyContent:
                      searchResults.result.id === userAuth?.attributes.sub!
                        ? "flex-start"
                        : "center",
                  }}
                >
                  {searchResults.result.id === !userAuth?.attributes.sub! && (
                    <View style={{ marginRight: 10 }}>
                      <Button title={"Block"} />
                    </View>
                  )}
                  <AddButton
                    contacts={contacts}
                    searchResults={searchResults}
                    currentUserId={userAuth?.attributes.sub!}
                    addFriendHandler={addFriendHandler}
                    justAdded={justAddedRef.current}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      {searchResults.result === null && (
        <Text style={{ fontFamily: "Exo2", color: "white", marginTop: 50 }}>
          No results found
        </Text>
      )}
    </View>
  );
};

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
      return <Button title="Your Account" disabled />;

    if (
      contactIdArray &&
      contactIdArray.some((id) => searchResults.result.id === id)
    ) {
      const friend = contacts.find(
        (item) => searchResults.result.id === item.friend.id
      );

      const isBlocked =
        friend?.userContact?.requestStatus === "BLOCKED"
          ? "You have been blocked"
          : "Added";

      switch (friend?.requestStatus) {
        case "REQUESTED":
          return friend.sender ? (
            <Button title="Requested" disabled />
          ) : (
            <Button
              title="Add Contact"
              onPress={() => addFriendHandler(friend)}
            />
          );
        case "BLOCKED":
          return <Button title="Blocked" disabled />;
        case "ACCEPTED":
          return <Button title={justAdded ? "Added" : isBlocked} disabled />;
      }
    }
  }

  return <Button title="Add Friend" onPress={() => addFriendHandler()} />;
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  inviteContainer: {
    backgroundColor: Colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    marginTop: 30,
  },
  inviteHeader: {
    backgroundColor: Colors.secondary,
    alignSelf: "flex-start",
    width: "100%",
    padding: 10,
  },
  inputText: {
    backgroundColor: "white",
    height: 40,
    marginVertical: 5,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.black,
    width: "90%",
    borderRadius: 2,
    paddingHorizontal: 7,
  },
  resultsContainer: { width: "85%" },
  resultsTextProp: { color: "white", fontFamily: "Chakra", marginRight: 5 },
  resultsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultsText: {
    fontFamily: "Exo2",
    color: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  mainResults: { backgroundColor: Colors.primary, padding: 10 },
});
