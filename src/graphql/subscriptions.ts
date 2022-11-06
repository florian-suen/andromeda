/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatGroup = /* GraphQL */ `
  subscription OnCreateChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onCreateChatGroup(filter: $filter) {
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
export const onUpdateChatGroup = /* GraphQL */ `
  subscription OnUpdateChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onUpdateChatGroup(filter: $filter) {
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
export const onDeleteChatGroup = /* GraphQL */ `
  subscription OnDeleteChatGroup(
    $filter: ModelSubscriptionChatGroupFilterInput
  ) {
    onDeleteChatGroup(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateUserChatGroup = /* GraphQL */ `
  subscription OnCreateUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onCreateUserChatGroup(filter: $filter) {
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
export const onUpdateUserChatGroup = /* GraphQL */ `
  subscription OnUpdateUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onUpdateUserChatGroup(filter: $filter) {
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
export const onDeleteUserChatGroup = /* GraphQL */ `
  subscription OnDeleteUserChatGroup(
    $filter: ModelSubscriptionUserChatGroupFilterInput
  ) {
    onDeleteUserChatGroup(filter: $filter) {
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
