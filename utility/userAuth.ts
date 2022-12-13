import { Auth } from "aws-amplify";
import { createContext } from "react";
export const userContext = createContext<any>(null);

export const getUserAuth = async () => {
  let userAuth: any;

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

  return userAuth;
};
