import { GroupChat } from "../components/GroupChatCompound/GroupChatCompound";

export const GroupChatScreen = () => {
  return (
    <GroupChat>
      <GroupChat.Menu />
      <GroupChat.Messages />
      <GroupChat.InputBox />
    </GroupChat>
  );
};
