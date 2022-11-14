/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFriends = /* GraphQL */ `
  subscription OnCreateFriends($filter: ModelSubscriptionFriendsFilterInput) {
    onCreateFriends(filter: $filter) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateFriends = /* GraphQL */ `
  subscription OnUpdateFriends($filter: ModelSubscriptionFriendsFilterInput) {
    onUpdateFriends(filter: $filter) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteFriends = /* GraphQL */ `
  subscription OnDeleteFriends($filter: ModelSubscriptionFriendsFilterInput) {
    onDeleteFriends(filter: $filter) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatGroup = /* GraphQL */ `
  subscription OnCreateChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onCreateChatGroup(filter: $filter) {
      id
      name
      image
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
        nextToken
        startedAt
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
export const onUpdateChatGroup = /* GraphQL */ `
  subscription OnUpdateChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onUpdateChatGroup(filter: $filter) {
      id
      image
      name
      LastMessage {
        message
        createdAt
      }
    }
  }
`;
export const onDeleteChatGroup = /* GraphQL */ `
  subscription OnDeleteChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onDeleteChatGroup(filter: $filter) {
      id
      name
      image
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
        nextToken
        startedAt
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateUserChatGroup = /* GraphQL */ `
  subscription OnCreateUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onCreateUserChatGroup(filter: $filter) {
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
export const onUpdateUserChatGroup = /* GraphQL */ `
  subscription OnUpdateUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onUpdateUserChatGroup(filter: $filter) {
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
export const onDeleteUserChatGroup = /* GraphQL */ `
  subscription OnDeleteUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onDeleteUserChatGroup(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
