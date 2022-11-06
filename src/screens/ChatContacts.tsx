import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { ChatContactsComponent } from "../components/ChatContacts/ChatContacts";
import { graphqlOperation, API } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { User } from "../models/index";
export const ChatContacts = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const api = API.graphql(graphqlOperation(listUsers));
    if ("then" in api)
      api.then((results) => {
        return setUsers(results.data?.listUsers?.items);
      });
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ChatContactsComponent user={item} />}
    ></FlatList>
  );
};
