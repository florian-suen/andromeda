import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import { useAppDispatch } from "../../utility/useReduxHooks";
import {
  onCreateAttachment,
  onCreateMedia,
  onCreateMessage,
} from "../graphql/subscriptions";
import {
  addMessage,
  getMessageList,
  updateMessageAttachments,
  updateMessageMedia,
} from "../redux/messages/messageSlice";

type dispatch = ReturnType<typeof useAppDispatch>;

export const subCreateMessage = (chatGroupId: string, dispatch: dispatch) => {
  useEffect(() => {
    dispatch(getMessageList(chatGroupId));

    const onCreateMsg = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const msgSubscription =
      "subscribe" in onCreateMsg &&
      onCreateMsg.subscribe({
        next: ({ value }: any) => {
          value.data.onCreateMessage.Attachments = { items: [] };
          value.data.onCreateMessage.Media = { items: [] };

          dispatch(
            addMessage({ chatGroupId, newMessage: value.data.onCreateMessage })
          );
        },
        error: (err) => {
          console.log(`onCreateMessage subscription error:${err}`);
        },
      });

    const onCreateAttach = API.graphql(
      graphqlOperation(onCreateAttachment, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const attachSubscription =
      "subscribe" in onCreateAttach &&
      onCreateAttach.subscribe({
        next: ({ value }: any) => {
          dispatch(
            updateMessageAttachments({
              chatGroupId,
              newAttachment: value.data.onCreateAttachment,
            })
          );
        },
        error: (err) => {
          console.log(`onCreateAttachment subscription error:${err}`);
        },
      });

    const onCreateMediaSub = API.graphql(
      graphqlOperation(onCreateMedia, {
        filter: { chatgroupID: { eq: chatGroupId } },
      })
    );

    const mediaSubscription =
      "subscribe" in onCreateMediaSub &&
      onCreateMediaSub.subscribe({
        next: ({ value }: any) => {
          dispatch(
            updateMessageMedia({
              chatGroupId,
              newMedia: value.data.onCreateMedia,
            })
          );
        },
        error: (err) => {
          console.log(`onCreateMedia subscription error:${err}`);
        },
      });

    return () => {
      msgSubscription && msgSubscription.unsubscribe();
      attachSubscription && attachSubscription.unsubscribe();
      mediaSubscription && mediaSubscription.unsubscribe();
    };
  }, [chatGroupId]);
};
