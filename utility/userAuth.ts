import { Auth } from "aws-amplify";
import { createContext } from "react";

export type UserAuth = {
  refreshSession: (string: object, func: Function) => any;
  signInUserSession: {
    accessToken: { jwtToken: string };
    refreshToken: { token: string };
  };
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  };
};

export const userContext = createContext<null | UserAuth>(null);
export const getUserAuth = async () => {
  let userAuth: UserAuth | null = null;

  try {
    userAuth = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });

    if (userAuth) {
      const currentSession = userAuth.signInUserSession;
      userAuth.refreshSession(
        currentSession.refreshToken,
        (err: any, session: any) => {
          err && console.log("refresh token error", err);
        }
      );
    }
  } catch (e) {
    console.log("unable to refresh token", e);
  }

  return userAuth;
};
