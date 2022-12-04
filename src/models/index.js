// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AttachmentType = {
  "IMAGE": "IMAGE",
  "VIDEO": "VIDEO"
};

const { Attachment, Friends, ChatGroup, Message, UserChatGroup, User } = initSchema(schema);

export {
  Attachment,
  Friends,
  ChatGroup,
  Message,
  UserChatGroup,
  User,
  AttachmentType
};