/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia($filter: ModelSubscriptionMediaFilterInput) {
    onCreateMedia(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      blogID
      duration
      width
      height
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia($filter: ModelSubscriptionMediaFilterInput) {
    onUpdateMedia(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      blogID
      duration
      width
      height
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia($filter: ModelSubscriptionMediaFilterInput) {
    onDeleteMedia(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      blogID
      duration
      width
      height
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAttachment = /* GraphQL */ `
  subscription OnCreateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onCreateAttachment(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAttachment = /* GraphQL */ `
  subscription OnUpdateAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onUpdateAttachment(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAttachment = /* GraphQL */ `
  subscription OnDeleteAttachment(
    $filter: ModelSubscriptionAttachmentFilterInput
  ) {
    onDeleteAttachment(filter: $filter) {
      id
      storageKey
      type
      messageID
      chatgroupID
      name
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
      leaderID
      Attachments {
        nextToken
        startedAt
      }
      Media {
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
      leaderID
      Attachments {
        nextToken
        startedAt
      }
      Media {
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
      leaderID
      Attachments {
        nextToken
        startedAt
      }
      Media {
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
      inviteId
      Messages {
        nextToken
        startedAt
      }
      ChatGroups {
        nextToken
        startedAt
      }
      Friends {
        nextToken
        startedAt
      }
      Leader {
        nextToken
        startedAt
      }
      Blog {
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
      inviteId
      Messages {
        nextToken
        startedAt
      }
      ChatGroups {
        nextToken
        startedAt
      }
      Friends {
        nextToken
        startedAt
      }
      Leader {
        nextToken
        startedAt
      }
      Blog {
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
      inviteId
      Messages {
        nextToken
        startedAt
      }
      ChatGroups {
        nextToken
        startedAt
      }
      Friends {
        nextToken
        startedAt
      }
      Leader {
        nextToken
        startedAt
      }
      Blog {
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
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
      id
      createdAt
      message
      comments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onUpdateBlog(filter: $filter) {
      id
      createdAt
      message
      comments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($filter: ModelSubscriptionBlogFilterInput) {
    onDeleteBlog(filter: $filter) {
      id
      createdAt
      message
      comments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      createdAt
      message
      commentID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      createdAt
      message
      commentID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      createdAt
      message
      commentID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserContact = /* GraphQL */ `
  subscription OnCreateUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onCreateUserContact(filter: $filter) {
      id
      userID
      friendID
      updatedAt
      sender
      requestStatus
      user {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      friend {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userContact {
        id
        userID
        friendID
        updatedAt
        sender
        requestStatus
        createdAt
        _version
        _deleted
        _lastChangedAt
        userContactUserContactId
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      userContactUserContactId
    }
  }
`;
export const onUpdateUserContact = /* GraphQL */ `
  subscription OnUpdateUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onUpdateUserContact(filter: $filter) {
      id
      userID
      friendID
      updatedAt
      sender
      requestStatus
      user {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      friend {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userContact {
        id
        userID
        friendID
        updatedAt
        sender
        requestStatus
        createdAt
        _version
        _deleted
        _lastChangedAt
        userContactUserContactId
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      userContactUserContactId
    }
  }
`;
export const onDeleteUserContact = /* GraphQL */ `
  subscription OnDeleteUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onDeleteUserContact(filter: $filter) {
      id
      userID
      friendID
      updatedAt
      sender
      requestStatus
      user {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      friend {
        id
        username
        status
        image
        inviteId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userContact {
        id
        userID
        friendID
        updatedAt
        sender
        requestStatus
        createdAt
        _version
        _deleted
        _lastChangedAt
        userContactUserContactId
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      userContactUserContactId
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
        leaderID
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
        inviteId
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
        leaderID
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
        inviteId
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
        leaderID
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
        inviteId
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
      Attachments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
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
      Attachments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
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
      Attachments {
        nextToken
        startedAt
      }
      Media {
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
