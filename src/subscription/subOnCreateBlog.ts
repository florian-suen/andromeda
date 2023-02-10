import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { AppDispatch } from "../redux/store";
import { onCreateBlog } from "./subscriptionQueries";
import {
  CurrentUserType,
  updateUserBlogOnCreateMedia,
  updateUserOnCreateBlog,
} from "../redux/currentUser/currentUserSlice";
import { onCreateMedia } from "../graphql/subscriptions";
import { Media } from "../redux/messages/messageSlice";

export const subOnCreateBlog = (userId: string, dispatch: AppDispatch) => {
  useEffect(() => {
    const onSubCreateBlog = API.graphql(
      graphqlOperation(onCreateBlog, {
        filter: { userID: { eq: userId } },
      })
    );

    const createBlogSub =
      "subscribe" in onSubCreateBlog &&
      onSubCreateBlog.subscribe({
        next: ({
          value,
        }: {
          value: {
            data: { onCreateBlog: CurrentUserType["Blog"]["items"][0] };
          };
        }) => {
          if (userId === value.data.onCreateBlog.userID) {
            value.data.onCreateBlog.Media = { items: [] };
            dispatch(
              updateUserOnCreateBlog({
                blog: value.data.onCreateBlog,
              })
            );
          }
        },
        error: (err) => console.log(`onCreateBlog subscription error ${err}`),
      });

    const onCreateMediaSub = API.graphql(
      graphqlOperation(onCreateMedia, {
        filter: { userID: { eq: userId } },
      })
    );

    const mediaSubscription =
      "subscribe" in onCreateMediaSub &&
      onCreateMediaSub.subscribe({
        next: ({ value }: { value: { data: { onCreateMedia: Media } } }) => {
          dispatch(
            updateUserBlogOnCreateMedia({
              blogId: value.data.onCreateMedia.blogID,
              newMedia: value.data.onCreateMedia,
            })
          );
        },
        error: (err) => {
          console.log(`onCreateMedia subscription error:${err}`);
        },
      });

    return () => {
      console.log("Unsubscribing Create Blog");
      createBlogSub && createBlogSub.unsubscribe;
    };
  }, []);
};
