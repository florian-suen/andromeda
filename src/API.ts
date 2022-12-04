/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAttachmentInput = {
  id?: string | null,
  storageKey: string,
  typ: AttachmentType,
  width?: number | null,
  height?: number | null,
  duration?: number | null,
  messageID: string,
  chatgroupID: string,
  _version?: number | null,
};

export enum AttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}


export type ModelAttachmentConditionInput = {
  storageKey?: ModelStringInput | null,
  typ?: ModelAttachmentTypeInput | null,
  width?: ModelIntInput | null,
  height?: ModelIntInput | null,
  duration?: ModelIntInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelAttachmentConditionInput | null > | null,
  or?: Array< ModelAttachmentConditionInput | null > | null,
  not?: ModelAttachmentConditionInput | null,
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

export type ModelAttachmentTypeInput = {
  eq?: AttachmentType | null,
  ne?: AttachmentType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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

export type Attachment = {
  __typename: "Attachment",
  id: string,
  storageKey: string,
  typ: AttachmentType,
  width?: number | null,
  height?: number | null,
  duration?: number | null,
  messageID: string,
  chatgroupID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAttachmentInput = {
  id: string,
  storageKey?: string | null,
  typ?: AttachmentType | null,
  width?: number | null,
  height?: number | null,
  duration?: number | null,
  messageID?: string | null,
  chatgroupID?: string | null,
  _version?: number | null,
};

export type DeleteAttachmentInput = {
  id: string,
  _version?: number | null,
};

export type CreateFriendsInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelFriendsConditionInput = {
  and?: Array< ModelFriendsConditionInput | null > | null,
  or?: Array< ModelFriendsConditionInput | null > | null,
  not?: ModelFriendsConditionInput | null,
};

export type Friends = {
  __typename: "Friends",
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateFriendsInput = {
  id: string,
  _version?: number | null,
};

export type DeleteFriendsInput = {
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
  images?: Array< string | null > | null,
  Attachments?: ModelAttachmentConnection | null,
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
  Messages?: ModelMessageConnection | null,
  ChatGroups?: ModelUserChatGroupConnection | null,
  Leader?: ModelChatGroupConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

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
  _version?: number | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  status?: string | null,
  image?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
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
  images?: Array< string | null > | null,
  _version?: number | null,
};

export type ModelMessageConditionInput = {
  createdAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  images?: ModelStringInput | null,
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
  images?: Array< string | null > | null,
  _version?: number | null,
};

export type DeleteMessageInput = {
  id: string,
  _version?: number | null,
};

export type ModelAttachmentFilterInput = {
  id?: ModelIDInput | null,
  storageKey?: ModelStringInput | null,
  typ?: ModelAttachmentTypeInput | null,
  width?: ModelIntInput | null,
  height?: ModelIntInput | null,
  duration?: ModelIntInput | null,
  messageID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelAttachmentFilterInput | null > | null,
  or?: Array< ModelAttachmentFilterInput | null > | null,
  not?: ModelAttachmentFilterInput | null,
};

export type ModelFriendsFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelFriendsFilterInput | null > | null,
  or?: Array< ModelFriendsFilterInput | null > | null,
  not?: ModelFriendsFilterInput | null,
};

export type ModelFriendsConnection = {
  __typename: "ModelFriendsConnection",
  items:  Array<Friends | null >,
  nextToken?: string | null,
  startedAt?: number | null,
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  chatgroupID?: ModelIDInput | null,
  images?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelSubscriptionAttachmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  storageKey?: ModelSubscriptionStringInput | null,
  typ?: ModelSubscriptionStringInput | null,
  width?: ModelSubscriptionIntInput | null,
  height?: ModelSubscriptionIntInput | null,
  duration?: ModelSubscriptionIntInput | null,
  messageID?: ModelSubscriptionIDInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
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

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFriendsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionFriendsFilterInput | null > | null,
  or?: Array< ModelSubscriptionFriendsFilterInput | null > | null,
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
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
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
  images?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateFriendsMutationVariables = {
  input: CreateFriendsInput,
  condition?: ModelFriendsConditionInput | null,
};

export type CreateFriendsMutation = {
  createFriends?:  {
    __typename: "Friends",
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateFriendsMutationVariables = {
  input: UpdateFriendsInput,
  condition?: ModelFriendsConditionInput | null,
};

export type UpdateFriendsMutation = {
  updateFriends?:  {
    __typename: "Friends",
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteFriendsMutationVariables = {
  input: DeleteFriendsInput,
  condition?: ModelFriendsConditionInput | null,
};

export type DeleteFriendsMutation = {
  deleteFriends?:  {
    __typename: "Friends",
    id: string,
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
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
      typ: AttachmentType,
      width?: number | null,
      height?: number | null,
      duration?: number | null,
      messageID: string,
      chatgroupID: string,
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
      typ: AttachmentType,
      width?: number | null,
      height?: number | null,
      duration?: number | null,
      messageID: string,
      chatgroupID: string,
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

export type GetFriendsQueryVariables = {
  id: string,
};

export type GetFriendsQuery = {
  getFriends?:  {
    __typename: "Friends",
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListFriendsQueryVariables = {
  filter?: ModelFriendsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFriendsQuery = {
  listFriends?:  {
    __typename: "ModelFriendsConnection",
    items:  Array< {
      __typename: "Friends",
      id: string,
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

export type SyncFriendsQueryVariables = {
  filter?: ModelFriendsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncFriendsQuery = {
  syncFriends?:  {
    __typename: "ModelFriendsConnection",
    items:  Array< {
      __typename: "Friends",
      id: string,
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
      images?: Array< string | null > | null,
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
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
    typ: AttachmentType,
    width?: number | null,
    height?: number | null,
    duration?: number | null,
    messageID: string,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateFriendsSubscriptionVariables = {
  filter?: ModelSubscriptionFriendsFilterInput | null,
};

export type OnCreateFriendsSubscription = {
  onCreateFriends?:  {
    __typename: "Friends",
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateFriendsSubscriptionVariables = {
  filter?: ModelSubscriptionFriendsFilterInput | null,
};

export type OnUpdateFriendsSubscription = {
  onUpdateFriends?:  {
    __typename: "Friends",
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteFriendsSubscriptionVariables = {
  filter?: ModelSubscriptionFriendsFilterInput | null,
};

export type OnDeleteFriendsSubscription = {
  onDeleteFriends?:  {
    __typename: "Friends",
    id: string,
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
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
      images?: Array< string | null > | null,
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
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
    images?: Array< string | null > | null,
    Attachments?:  {
      __typename: "ModelAttachmentConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
