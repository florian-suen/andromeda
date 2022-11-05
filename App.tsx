import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Index } from "./src";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <>
      <Index />
    </>
  );
}

export default withAuthenticator(App, { Amplify });
