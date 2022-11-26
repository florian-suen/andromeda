import { GroupChat } from "../components/GroupChatCompound";

export const GroupChatScreen = () => {
  return (
    <GroupChat>
      <GroupChat.Menu />
      <GroupChat.Messages />
      <GroupChat.InputBox />
    </GroupChat>
  );
};
