// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatGroup, Message, UserChatGroup, User } = initSchema(schema);

export {
  ChatGroup,
  Message,
  UserChatGroup,
  User
};