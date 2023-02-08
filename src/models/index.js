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

const RequestStatusType = {
  "REQUESTED": "REQUESTED",
  "ACCEPTED": "ACCEPTED",
  "BLOCKED": "BLOCKED"
};

const { Media, Attachment, ChatGroup, Message, UserChatGroup, User, UserContact, Blog, Comment } = initSchema(schema);

export {
  Media,
  Attachment,
  ChatGroup,
  Message,
  UserChatGroup,
  User,
  UserContact,
  Blog,
  Comment,
  MediaType,
  AttachmentType,
  RequestStatusType
};