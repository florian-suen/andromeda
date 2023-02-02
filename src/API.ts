/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMediaInput = {
  id?: string | null,
  storageKey?: string | null,
  type?: MediaType | null,
  messageID: string,
  chatgroupID: string,
  duration?: string | null,
  width?: string | null,
  height?: string | null,
  _version?: number | null,
};

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}


export type ModelMediaConditionInput = {
  storageKey?: ModelStringInput | null,
  type?: ModelMediaTypeInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  duration?: ModelStringInput | null,
  width?: ModelStringInput | null,
  height?: ModelStringInput | null,
  and?: Array< ModelMediaConditionInput | null > | null,
  or?: Array< ModelMediaConditionInput | null > | null,
  not?: ModelMediaConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelMediaTypeInput = {
  eq?: MediaType | null,
  ne?: MediaType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Media = {
  __typename: "Media",
  id: string,
  storageKey?: string | null,
  type?: MediaType | null,
  messageID: string,
  chatgroupID: string,
  duration?: string | null,
  width?: string | null,
  height?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateMediaInput = {
  id: string,
  storageKey?: string | null,
  type?: MediaType | null,
  messageID?: string | null,
  chatgroupID?: string | null,
  duration?: string | null,
  width?: string | null,
  height?: string | null,
  _version?: number | null,
};

export type DeleteMediaInput = {
  id: string,
  _version?: number | null,
};

export type CreateAttachmentInput = {
  id?: string | null,
  storageKey: string,
  type: AttachmentType,
  messageID: string,
  chatgroupID: string,
  name: string,
  _version?: number | null,
};

export enum AttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}


export type ModelAttachmentConditionInput = {
  storageKey?: ModelStringInput | null,
  type?: ModelAttachmentTypeInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelAttachmentConditionInput | null > | null,
  or?: Array< ModelAttachmentConditionInput | null > | null,
  not?: ModelAttachmentConditionInput | null,
};

export type ModelAttachmentTypeInput = {
  eq?: AttachmentType | null,
  ne?: AttachmentType | null,
};

export type Attachment = {
  __typename: "Attachment",
  id: string,
  storageKey: string,
  type: AttachmentType,
  messageID: string,
  chatgroupID: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAttachmentInput = {
  id: string,
  storageKey?: string | null,
  type?: AttachmentType | null,
  messageID?: string | null,
  chatgroupID?: string | null,
  name?: string | null,
  _version?: number | null,
};

export type DeleteAttachmentInput = {
  id: string,
  _version?: number | null,
};

export type CreateChatGroupInput = {
  id?: string | null,
  name?: string | null,
  image?: string | null,
  leaderID?: string | null,
  _version?: number | null,
  chatGroupLastMessageId?: string | null,
};

export type ModelChatGroupConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  leaderID?: ModelIDInput | null,
  and?: Array< ModelChatGroupConditionInput | null > | null,
  or?: Array< ModelChatGroupConditionInput | null > | null,
  not?: ModelChatGroupConditionInput | null,
  chatGroupLastMessageId?: ModelIDInput | null,
};

export type ChatGroup = {
  __typename: "ChatGroup",
  id: string,
  name?: string | null,
  image?: string | null,
  LastMessage?: Message | null,
  Messages?: ModelMessageConnection | null,
  users?: ModelUserChatGroupConnection | null,
  leaderID?: string | null,
  Attachments?: ModelAttachmentConnection | null,
  Media?: ModelMediaConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  chatGroupLastMessageId?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  createdAt?: string | null,
  message?: string | null,
  userID: string,
  chatgroupID: string,
  Attachments?: ModelAttachmentConnection | null,
  Media?: ModelMediaConnection | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelAttachmentConnection = {
  __typename: "ModelAttachmentConnection",
  items:  Array<Attachment | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection",
  items:  Array<Media | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserChatGroupConnection = {
  __typename: "ModelUserChatGroupConnection",
  items:  Array<UserChatGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UserChatGroup = {
  __typename: "UserChatGroup",
  id: string,
  userID: string,
  chatgroupID: string,
  updatedAt: string,
  Chatgroup?: ChatGroup | null,
  user?: User | null,
  createdAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  status?: string | null,
  image?: string | null,
  inviteId: string,
  Messages?: ModelMessageConnection | null,
  ChatGroups?: ModelUserChatGroupConnection | null,
  Friends?: ModelUserContactConnection | null,
  Leader?: ModelChatGroupConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelUserContactConnection = {
  __typename: "ModelUserContactConnection",
  items:  Array<UserContact | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UserContact = {
  __typename: "UserContact",
  id: string,
  userID: string,
  friendID: string,
  updatedAt: string,
  sender: boolean,
  requestStatus: requestStatusType,
  user?: User | null,
  friend?: User | null,
  userContact?: UserContact | null,
  createdAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  userContactUserContactId?: string | null,
};

export enum requestStatusType {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  BLOCKED = "BLOCKED",
}


export type ModelChatGroupConnection = {
  __typename: "ModelChatGroupConnection",
  items:  Array<ChatGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateChatGroupInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  leaderID?: string | null,
  _version?: number | null,
  chatGroupLastMessageId?: string | null,
};

export type DeleteChatGroupInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  status?: string | null,
  image?: string | null,
  inviteId: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  inviteId?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  status?: string | null,
  image?: string | null,
  inviteId?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserContactInput = {
  id?: string | null,
  userID: string,
  friendID: string,
  updatedAt?: string | null,
  sender: boolean,
  requestStatus: requestStatusType,
  _version?: number | null,
  userContactUserContactId?: string | null,
};

export type ModelUserContactConditionInput = {
  userID?: ModelIDInput | null,
  friendID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  sender?: ModelBooleanInput | null,
  requestStatus?: ModelrequestStatusTypeInput | null,
  and?: Array< ModelUserContactConditionInput | null > | null,
  or?: Array< ModelUserContactConditionInput | null > | null,
  not?: ModelUserContactConditionInput | null,
  userContactUserContactId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelrequestStatusTypeInput = {
  eq?: requestStatusType | null,
  ne?: requestStatusType | null,
};

export type UpdateUserContactInput = {
  id: string,
  userID?: string | null,
  friendID?: string | null,
  updatedAt?: string | null,
  sender?: boolean | null,
  requestStatus?: requestStatusType | null,
  _version?: number | null,
  userContactUserContactId?: string | null,
};

export type DeleteUserContactInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserChatGroupInput = {
  id?: string | null,
  userID: string,
  chatgroupID: string,
  updatedAt?: string | null,
  _version?: number | null,
};

export type ModelUserChatGroupConditionInput = {
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatGroupConditionInput | null > | null,
  or?: Array< ModelUserChatGroupConditionInput | null > | null,
  not?: ModelUserChatGroupConditionInput | null,
};

export type UpdateUserChatGroupInput = {
  id: string,
  userID?: string | null,
  chatgroupID?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type DeleteUserChatGroupInput = {
  id: string,
  _version?: number | null,
};

export type CreateMessageInput = {
  id?: string | null,
  createdAt?: string | null,
  message?: string | null,
  userID: string,
  chatgroupID: string,
  _version?: number | null,
};

export type ModelMessageConditionInput = {
  createdAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
};

export type UpdateMessageInput = {
  id: string,
  createdAt?: string | null,
  message?: string | null,
  userID?: string | null,
  chatgroupID?: string | null,
  _version?: number | null,
};

export type DeleteMessageInput = {
  id: string,
  _version?: number | null,
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null,
  storageKey?: ModelStringInput | null,
  type?: ModelMediaTypeInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  duration?: ModelStringInput | null,
  width?: ModelStringInput | null,
  height?: ModelStringInput | null,
  and?: Array< ModelMediaFilterInput | null > | null,
  or?: Array< ModelMediaFilterInput | null > | null,
  not?: ModelMediaFilterInput | null,
};

export type ModelAttachmentFilterInput = {
  id?: ModelIDInput | null,
  storageKey?: ModelStringInput | null,
  type?: ModelAttachmentTypeInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelAttachmentFilterInput | null > | null,
  or?: Array< ModelAttachmentFilterInput | null > | null,
  not?: ModelAttachmentFilterInput | null,
};

export type ModelChatGroupFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  leaderID?: ModelIDInput | null,
  and?: Array< ModelChatGroupFilterInput | null > | null,
  or?: Array< ModelChatGroupFilterInput | null > | null,
  not?: ModelChatGroupFilterInput | null,
  chatGroupLastMessageId?: ModelIDInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  inviteId?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserContactFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  friendID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  sender?: ModelBooleanInput | null,
  requestStatus?: ModelrequestStatusTypeInput | null,
  and?: Array< ModelUserContactFilterInput | null > | null,
  or?: Array< ModelUserContactFilterInput | null > | null,
  not?: ModelUserContactFilterInput | null,
  userContactUserContactId?: ModelIDInput | null,
};

export type ModelUserChatGroupFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatGroupFilterInput | null > | null,
  or?: Array< ModelUserChatGroupFilterInput | null > | null,
  not?: ModelUserChatGroupFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelSubscriptionMediaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  storageKey?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  messageID?: ModelSubscriptionIDInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  duration?: ModelSubscriptionStringInput | null,
  width?: ModelSubscriptionStringInput | null,
  height?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMediaFilterInput | null > | null,
  or?: Array< ModelSubscriptionMediaFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAttachmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  storageKey?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  messageID?: ModelSubscriptionIDInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
};

export type ModelSubscriptionChatGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  leaderID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  inviteId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionUserContactFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  friendID?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  sender?: ModelSubscriptionBooleanInput | null,
  requestStatus?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserContactFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionUserChatGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserChatGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatGroupFilterInput | null > | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type CreateMediaMutation = {
  createMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type UpdateMediaMutation = {
  updateMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type DeleteMediaMutation = {
  deleteMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateAttachmentMutationVariables = {
  input: CreateAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type CreateAttachmentMutation = {
  createAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAttachmentMutationVariables = {
  input: UpdateAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type UpdateAttachmentMutation = {
  updateAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAttachmentMutationVariables = {
  input: DeleteAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type DeleteAttachmentMutation = {
  deleteAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateChatGroupMutationVariables = {
  input: CreateChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type CreateChatGroupMutation = {
  createChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type UpdateChatGroupMutationVariables = {
  input: UpdateChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type UpdateChatGroupMutation = {
  updateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type DeleteChatGroupMutationVariables = {
  input: DeleteChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type DeleteChatGroupMutation = {
  deleteChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserContactMutationVariables = {
  input: CreateUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type CreateUserContactMutation = {
  createUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type UpdateUserContactMutationVariables = {
  input: UpdateUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type UpdateUserContactMutation = {
  updateUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type DeleteUserContactMutationVariables = {
  input: DeleteUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type DeleteUserContactMutation = {
  deleteUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type CreateUserChatGroupMutationVariables = {
  input: CreateUserChatGroupInput,
  condition?: ModelUserChatGroupConditionInput | null,
};

export type CreateUserChatGroupMutation = {
  createUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserChatGroupMutationVariables = {
  input: UpdateUserChatGroupInput,
  condition?: ModelUserChatGroupConditionInput | null,
};

export type UpdateUserChatGroupMutation = {
  updateUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserChatGroupMutationVariables = {
  input: DeleteUserChatGroupInput,
  condition?: ModelUserChatGroupConditionInput | null,
};

export type DeleteUserChatGroupMutation = {
  deleteUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetMediaQueryVariables = {
  id: string,
};

export type GetMediaQuery = {
  getMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediaQuery = {
  listMedia?:  {
    __typename: "ModelMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      storageKey?: string | null,
      type?: MediaType | null,
      messageID: string,
      chatgroupID: string,
      duration?: string | null,
      width?: string | null,
      height?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMediaQuery = {
  syncMedia?:  {
    __typename: "ModelMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      storageKey?: string | null,
      type?: MediaType | null,
      messageID: string,
      chatgroupID: string,
      duration?: string | null,
      width?: string | null,
      height?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAttachmentQueryVariables = {
  id: string,
};

export type GetAttachmentQuery = {
  getAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAttachmentsQueryVariables = {
  filter?: ModelAttachmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttachmentsQuery = {
  listAttachments?:  {
    __typename: "ModelAttachmentConnection",
    items:  Array< {
      __typename: "Attachment",
      id: string,
      storageKey: string,
      type: AttachmentType,
      messageID: string,
      chatgroupID: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAttachmentsQueryVariables = {
  filter?: ModelAttachmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAttachmentsQuery = {
  syncAttachments?:  {
    __typename: "ModelAttachmentConnection",
    items:  Array< {
      __typename: "Attachment",
      id: string,
      storageKey: string,
      type: AttachmentType,
      messageID: string,
      chatgroupID: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetChatGroupQueryVariables = {
  id: string,
};

export type GetChatGroupQuery = {
  getChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type ListChatGroupsQueryVariables = {
  filter?: ModelChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatGroupsQuery = {
  listChatGroups?:  {
    __typename: "ModelChatGroupConnection",
    items:  Array< {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncChatGroupsQueryVariables = {
  filter?: ModelChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncChatGroupsQuery = {
  syncChatGroups?:  {
    __typename: "ModelChatGroupConnection",
    items:  Array< {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserByInviteIdQueryVariables = {
  inviteId: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByInviteIdQuery = {
  userByInviteId?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserContactQueryVariables = {
  id: string,
};

export type GetUserContactQuery = {
  getUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type ListUserContactsQueryVariables = {
  filter?: ModelUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserContactsQuery = {
  listUserContacts?:  {
    __typename: "ModelUserContactConnection",
    items:  Array< {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserContactsQueryVariables = {
  filter?: ModelUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserContactsQuery = {
  syncUserContacts?:  {
    __typename: "ModelUserContactConnection",
    items:  Array< {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListbyUserContactFriendQueryVariables = {
  userID: string,
  friendID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListbyUserContactFriendQuery = {
  ListbyUserContactFriend?:  {
    __typename: "ModelUserContactConnection",
    items:  Array< {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserChatGroupQueryVariables = {
  id: string,
};

export type GetUserChatGroupQuery = {
  getUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUserChatGroupsQueryVariables = {
  filter?: ModelUserChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserChatGroupsQuery = {
  listUserChatGroups?:  {
    __typename: "ModelUserChatGroupConnection",
    items:  Array< {
      __typename: "UserChatGroup",
      id: string,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserChatGroupsQueryVariables = {
  filter?: ModelUserChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserChatGroupsQuery = {
  syncUserChatGroups?:  {
    __typename: "ModelUserChatGroupConnection",
    items:  Array< {
      __typename: "UserChatGroup",
      id: string,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListbyUserChatGroupQueryVariables = {
  userID: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListbyUserChatGroupQuery = {
  ListbyUserChatGroup?:  {
    __typename: "ModelUserChatGroupConnection",
    items:  Array< {
      __typename: "UserChatGroup",
      id: string,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListbyChatGroupUserQueryVariables = {
  chatgroupID: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListbyChatGroupUserQuery = {
  ListbyChatGroupUser?:  {
    __typename: "ModelUserChatGroupConnection",
    items:  Array< {
      __typename: "UserChatGroup",
      id: string,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMessagesQuery = {
  syncMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListMessagesByChatGroupQueryVariables = {
  chatgroupID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByChatGroupQuery = {
  listMessagesByChatGroup?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
};

export type OnCreateMediaSubscription = {
  onCreateMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?:  {
    __typename: "Media",
    id: string,
    storageKey?: string | null,
    type?: MediaType | null,
    messageID: string,
    chatgroupID: string,
    duration?: string | null,
    width?: string | null,
    height?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnCreateAttachmentSubscription = {
  onCreateAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnUpdateAttachmentSubscription = {
  onUpdateAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnDeleteAttachmentSubscription = {
  onDeleteAttachment?:  {
    __typename: "Attachment",
    id: string,
    storageKey: string,
    type: AttachmentType,
    messageID: string,
    chatgroupID: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnCreateChatGroupSubscription = {
  onCreateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type OnUpdateChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnUpdateChatGroupSubscription = {
  onUpdateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type OnDeleteChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnDeleteChatGroupSubscription = {
  onDeleteChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    name?: string | null,
    image?: string | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt?: string | null,
      message?: string | null,
      userID: string,
      chatgroupID: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    leaderID?: string | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    status?: string | null,
    image?: string | null,
    inviteId: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Friends?:  {
      __typename: "ModelUserContactConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Leader?:  {
      __typename: "ModelChatGroupConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionUserContactFilterInput | null,
};

export type OnCreateUserContactSubscription = {
  onCreateUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type OnUpdateUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionUserContactFilterInput | null,
};

export type OnUpdateUserContactSubscription = {
  onUpdateUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type OnDeleteUserContactSubscriptionVariables = {
  filter?: ModelSubscriptionUserContactFilterInput | null,
};

export type OnDeleteUserContactSubscription = {
  onDeleteUserContact?:  {
    __typename: "UserContact",
    id: string,
    userID: string,
    friendID: string,
    updatedAt: string,
    sender: boolean,
    requestStatus: requestStatusType,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    friend?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    userContact?:  {
      __typename: "UserContact",
      id: string,
      userID: string,
      friendID: string,
      updatedAt: string,
      sender: boolean,
      requestStatus: requestStatusType,
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      userContactUserContactId?: string | null,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    userContactUserContactId?: string | null,
  } | null,
};

export type OnCreateUserChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatGroupFilterInput | null,
};

export type OnCreateUserChatGroupSubscription = {
  onCreateUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatGroupFilterInput | null,
};

export type OnUpdateUserChatGroupSubscription = {
  onUpdateUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatGroupFilterInput | null,
};

export type OnDeleteUserChatGroupSubscription = {
  onDeleteUserChatGroup?:  {
    __typename: "UserChatGroup",
    id: string,
    userID: string,
    chatgroupID: string,
    updatedAt: string,
    Chatgroup?:  {
      __typename: "ChatGroup",
      id: string,
      name?: string | null,
      image?: string | null,
      leaderID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      status?: string | null,
      image?: string | null,
      inviteId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt?: string | null,
    message?: string | null,
    userID: string,
    chatgroupID: string,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Media?:  {
      __typename: "ModelMediaConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
