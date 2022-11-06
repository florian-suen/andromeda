// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatGroup, Message, User, UserChatGroup } = initSchema(schema);

export {
  ChatGroup,
  Message,
  User,
  UserChatGroup
};