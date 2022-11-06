/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatGroup = /* GraphQL */ `
  query GetChatGroup($id: ID!) {
    getChatGroup(id: $id) {
      id
      Messages {
        items {
          id
          message
          untitledfield
          chatgroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          chatGroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        message
        untitledfield
        chatgroupID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          message
          untitledfield
          chatgroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          message
          untitledfield
          chatgroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      message
      untitledfield
      chatgroupID
      userID
      createdAt
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
        message
        untitledfield
        chatgroupID
        userID
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
        message
        untitledfield
        chatgroupID
        userID
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      status
      image
      Messages {
        items {
          id
          message
          untitledfield
          chatgroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatGroups {
        items {
          id
          chatGroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
      nextToken
      startedAt
    }
  }
`;
export const getUserChatGroup = /* GraphQL */ `
  query GetUserChatGroup($id: ID!) {
    getUserChatGroup(id: $id) {
      id
      chatGroupID
      userID
      chatGroup {
        id
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          message
          untitledfield
          chatgroupID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
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
      createdAt
      updatedAt
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
        chatGroupID
        userID
        chatGroup {
          id
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
        chatGroupID
        userID
        chatGroup {
          id
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
