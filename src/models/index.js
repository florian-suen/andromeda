// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MediaType = {
  "IMAGE": "IMAGE",
  "VIDEO": "VIDEO"
};

const AttachmentType = {
  "IMAGE": "IMAGE",
  "VIDEO": "VIDEO"
};

const { Media, Attachment, Friends, ChatGroup, Message, UserChatGroup, User } = initSchema(schema);

export {
  Media,
  Attachment,
  Friends,
  ChatGroup,
  Message,
  UserChatGroup,
  User,
  MediaType,
  AttachmentType
};