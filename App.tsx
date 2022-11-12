import { Index } from "./src";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const userSync = async () => {
      const userAuth = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log(userAuth.attributes.sub);
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
        image: userAuth.attributes.image,
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
    <>
      <Index />
    </>
  );
}

export default withAuthenticator(App, { Amplify });
