// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Friends, ChatGroup, Message, UserChatGroup, User } = initSchema(schema);

export {
  Friends,
  ChatGroup,
  Message,
  UserChatGroup,
  User
};