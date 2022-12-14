import { Index } from "./src";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect, useState } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
import { getUserAuth, userContext } from "./utility/userAuth";
import { ActivityIndicator } from "react-native";
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  const [userAuth, setUserAuth] = useState("null");

  useEffect(() => {
    let userAuth: any;
    const userSync = async () => {
      userAuth = await getUserAuth();
      setUserAuth(userAuth);
      const user = await API.graphql(
        graphqlOperation(getUser, { id: userAuth.attributes.sub })
      );

      if ("data" in user && user.data?.getUser) {
        console.log("user exists");
        return;
      }
      const newUser = {
        id: userAuth.attributes.sub,
        username: userAuth.attributes.email,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        status: "Hey! I am new!",
      };

      const createdUser = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
      "data" in createdUser &&
        console.log(
          `created new user: ${createdUser.data?.createUser.username}`
        );
    };

    userSync();
  }, []);

  return (
    <userContext.Provider value={userAuth}>
      {userAuth ? <Index /> : <ActivityIndicator size="large" />}
    </userContext.Provider>
  );
}

export default withAuthenticator(App, { Amplify });
