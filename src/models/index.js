// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatGroup, User, Message, UserChatGroup } = initSchema(schema);

export {
  ChatGroup,
  User,
  Message,
  UserChatGroup
};