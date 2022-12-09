import { Index } from "./src";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
import { CognitoUserPool } from "amazon-cognito-identity-js";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const userSync = async () => {
      let userAuth;

      try {
        userAuth = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });

        const currentSession = userAuth.signInUserSession;
        userAuth.refreshSession(
          currentSession.refreshToken,
          (err: any, session: any) => {
            err && console.log("refresh token error", err);
          }
        );
      } catch (e) {
        console.log("unable to refresh token", e);
      }

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
    <>
      <Index />
    </>
  );
}

export default withAuthenticator(App, { Amplify });
