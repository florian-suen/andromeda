import React, { useContext } from "react";

import { InputBox as InputBoxComponent } from "../../InputBox/InputBox";
import { UserContext } from "../context";
export const InputBox = () => {
  const {
    messageTiming: { reverseTranslateYTiming },
    inputSelector,
    alert: { setBlockAlert, blockAlert },
    chatGroup: { chatGroupData },
  } = useContext<GroupChatContext>(UserContext);

  return (
    <InputBoxComponent
      selectorInput={inputSelector}
      chatGroup={chatGroupData}
      blockData={{ blockAlert, setBlockAlert }}
      timingFunction={reverseTranslateYTiming}
    />
  );
};
