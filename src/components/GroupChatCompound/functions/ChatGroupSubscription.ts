import { useEffect } from "react";
import { ChatGroupType } from "../../../redux/chatGroup/chatGroupSlice";
import { AppDispatch } from "../../../redux/store";
import { subOnDeleteUserChatGroup } from "../../../subscription/subUpdateDeleteUserChatGroup";

export const userChatGroupSubscription = (
  chatGroupId: string,
  chatGroupData: ChatGroupType["Chatgroup"],
  dispatch: AppDispatch
) => {
  useEffect(() => {
    let unsubDelUserChatGroup: () => void;

    unsubDelUserChatGroup = subOnDeleteUserChatGroup(chatGroupData, dispatch);

    return () => {
      unsubDelUserChatGroup();
    };
  }, [chatGroupId]);
};
