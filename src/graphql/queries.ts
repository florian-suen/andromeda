/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFriends = /* GraphQL */ `
  query GetFriends($id: ID!) {
    getFriends(id: $id) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFriends = /* GraphQL */ `
  query SyncFriends(
    $filter: ModelFriendsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFriends(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getChatGroup = /* GraphQL */ `
  query GetChatGroup($id: ID!) {
    getChatGroup(id: $id) {
      id
      name
      image
      leaderID
      LastMessage {
        id
        createdAt
        message
        userID
        chatgroupID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        nextToken
        startedAt
      }
      users {
        items {
          user {
            image
            status
            username
            id
          }
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatGroupLastMessageId
    }
  }
`;
export const listChatGroups = /* GraphQL */ `
  query ListChatGroups(
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatGroupLastMessageId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncChatGroups = /* GraphQL */ `
  query SyncChatGroups(
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatGroupLastMessageId
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      status
      image
      Messages {
        nextToken
        startedAt
      }
      ChatGroups {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        status
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        status
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserChatGroup = /* GraphQL */ `
  query GetUserChatGroup($id: ID!) {
    getUserChatGroup(id: $id) {
      id
      userID
      chatgroupID
      updatedAt
      Chatgroup {
        id
        name
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatGroupLastMessageId
      }
      user {
        id
        username
        status
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUserChatGroups = /* GraphQL */ `
  query ListUserChatGroups(
    $filter: ModelUserChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserChatGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatgroupID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserChatGroups = /* GraphQL */ `
  query SyncUserChatGroups(
    $filter: ModelUserChatGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserChatGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        chatgroupID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listbyUserChatGroup = /* GraphQL */ `
  query ListbyUserChatGroup(
    $userID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListbyUserChatGroup(
      userID: $userID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        chatgroupID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listbyChatGroupUser = /* GraphQL */ `
  query ListbyChatGroupUser(
    $chatgroupID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListbyChatGroupUser(
      chatgroupID: $chatgroupID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        chatgroupID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      createdAt
      message
      userID
      chatgroupID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        message
        userID
        chatgroupID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        message
        userID
        chatgroupID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listMessagesByChatGroup = /* GraphQL */ `
  query ListMessagesByChatGroup(
    $chatgroupID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByChatGroup(
      chatgroupID: $chatgroupID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        message
        userID
        chatgroupID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
