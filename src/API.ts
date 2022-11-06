/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateChatGroupInput = {
  id?: string | null,
  _version?: number | null,
  chatGroupLastMessageId?: string | null,
};

export type ModelChatGroupConditionInput = {
  and?: Array< ModelChatGroupConditionInput | null > | null,
  or?: Array< ModelChatGroupConditionInput | null > | null,
  not?: ModelChatGroupConditionInput | null,
  chatGroupLastMessageId?: ModelIDInput | null,
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

export type ChatGroup = {
  __typename: "ChatGroup",
  id: string,
  Messages?: ModelMessageConnection | null,
  users?: ModelUserChatGroupConnection | null,
  LastMessage?: Message | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  chatGroupLastMessageId?: string | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  message: string,
  untitledfield?: string | null,
  chatgroupID: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
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
  chatGroupID: string,
  userID: string,
  chatGroup: ChatGroup,
  user: User,
  createdAt: string,
  updatedAt: string,
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
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateChatGroupInput = {
  id: string,
  _version?: number | null,
  chatGroupLastMessageId?: string | null,
};

export type DeleteChatGroupInput = {
  id: string,
  _version?: number | null,
};

export type CreateMessageInput = {
  id?: string | null,
  message: string,
  untitledfield?: string | null,
  chatgroupID: string,
  userID: string,
  _version?: number | null,
};

export type ModelMessageConditionInput = {
  message?: ModelStringInput | null,
  untitledfield?: ModelStringInput | null,
  chatgroupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
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

export type UpdateMessageInput = {
  id: string,
  message?: string | null,
  untitledfield?: string | null,
  chatgroupID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteMessageInput = {
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
  chatGroupID: string,
  userID: string,
  _version?: number | null,
};

export type ModelUserChatGroupConditionInput = {
  chatGroupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserChatGroupConditionInput | null > | null,
  or?: Array< ModelUserChatGroupConditionInput | null > | null,
  not?: ModelUserChatGroupConditionInput | null,
};

export type UpdateUserChatGroupInput = {
  id: string,
  chatGroupID?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteUserChatGroupInput = {
  id: string,
  _version?: number | null,
};

export type ModelChatGroupFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelChatGroupFilterInput | null > | null,
  or?: Array< ModelChatGroupFilterInput | null > | null,
  not?: ModelChatGroupFilterInput | null,
  chatGroupLastMessageId?: ModelIDInput | null,
};

export type ModelChatGroupConnection = {
  __typename: "ModelChatGroupConnection",
  items:  Array<ChatGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  untitledfield?: ModelStringInput | null,
  chatgroupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
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
  chatGroupID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserChatGroupFilterInput | null > | null,
  or?: Array< ModelUserChatGroupFilterInput | null > | null,
  not?: ModelUserChatGroupFilterInput | null,
};

export type ModelSubscriptionChatGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
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

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  message?: ModelSubscriptionStringInput | null,
  untitledfield?: ModelSubscriptionStringInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
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
  chatGroupID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserChatGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatGroupFilterInput | null > | null,
};

export type CreateChatGroupMutationVariables = {
  input: CreateChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type CreateChatGroupMutation = {
  createChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
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
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
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
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
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
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetChatGroupQueryVariables = {
  id: string,
};

export type GetChatGroupQuery = {
  getChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
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

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
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
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
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
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
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
      chatGroupID: string,
      userID: string,
      chatGroup:  {
        __typename: "ChatGroup",
        id: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        chatGroupLastMessageId?: string | null,
      },
      user:  {
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
      },
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
      chatGroupID: string,
      userID: string,
      chatGroup:  {
        __typename: "ChatGroup",
        id: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        chatGroupLastMessageId?: string | null,
      },
      user:  {
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
      },
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

export type OnCreateChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnCreateChatGroupSubscription = {
  onCreateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
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
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      message: string,
      untitledfield?: string | null,
      chatgroupID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    chatGroupLastMessageId?: string | null,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
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
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
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
    message: string,
    untitledfield?: string | null,
    chatgroupID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
      items:  Array< {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ChatGroups?:  {
      __typename: "ModelUserChatGroupConnection",
      items:  Array< {
        __typename: "UserChatGroup",
        id: string,
        chatGroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
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
    chatGroupID: string,
    userID: string,
    chatGroup:  {
      __typename: "ChatGroup",
      id: string,
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
      LastMessage?:  {
        __typename: "Message",
        id: string,
        message: string,
        untitledfield?: string | null,
        chatgroupID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      chatGroupLastMessageId?: string | null,
    },
    user:  {
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
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
