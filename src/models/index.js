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

const { Media, Attachment, ChatGroup, Message, UserChatGroup, User, UserContact } = initSchema(schema);

export {
  Media,
  Attachment,
  ChatGroup,
  Message,
  UserChatGroup,
  User,
  UserContact,
  MediaType,
  AttachmentType
};