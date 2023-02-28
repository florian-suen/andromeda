import React, { useContext } from "react";
import { UserContext } from "../GroupChatCompound";
import { InputBox as InputBoxComponent } from "../../InputBox/InputBox";
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
