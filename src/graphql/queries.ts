/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
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
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMedia = /* GraphQL */ `
  query SyncMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMedia(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const mediaByMessageID = /* GraphQL */ `
  query MediaByMessageID(
    $messageID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaByMessageID(
      messageID: $messageID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const mediaByChatgroupID = /* GraphQL */ `
  query MediaByChatgroupID(
    $chatgroupID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaByChatgroupID(
      chatgroupID: $chatgroupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const mediaByBlogID = /* GraphQL */ `
  query MediaByBlogID(
    $blogID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaByBlogID(
      blogID: $blogID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAttachment = /* GraphQL */ `
  query GetAttachment($id: ID!) {
    getAttachment(id: $id) {
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
export const listAttachments = /* GraphQL */ `
  query ListAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAttachments = /* GraphQL */ `
  query SyncAttachments(
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttachments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const attachmentsByMessageID = /* GraphQL */ `
  query AttachmentsByMessageID(
    $messageID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    attachmentsByMessageID(
      messageID: $messageID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const attachmentsByChatgroupID = /* GraphQL */ `
  query AttachmentsByChatgroupID(
    $chatgroupID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAttachmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    attachmentsByChatgroupID(
      chatgroupID: $chatgroupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        leaderID
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
        leaderID
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
export const chatGroupsByLeaderID = /* GraphQL */ `
  query ChatGroupsByLeaderID(
    $leaderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatGroupsByLeaderID(
      leaderID: $leaderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        inviteId
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
        inviteId
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
export const userByInviteId = /* GraphQL */ `
  query UserByInviteId(
    $inviteId: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByInviteId(
      inviteId: $inviteId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        message
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
export const syncBlogs = /* GraphQL */ `
  query SyncBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBlogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        message
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
export const listbyBlogUser = /* GraphQL */ `
  query ListbyBlogUser(
    $id: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListbyBlogUser(
      id: $id
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
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        message
        commentID
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
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        createdAt
        message
        commentID
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
export const listMessagesByComment = /* GraphQL */ `
  query ListMessagesByComment(
    $commentID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByComment(
      commentID: $commentID
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
        commentID
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
export const getUserContact = /* GraphQL */ `
  query GetUserContact($id: ID!) {
    getUserContact(id: $id) {
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
export const listUserContacts = /* GraphQL */ `
  query ListUserContacts(
    $filter: ModelUserContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserContacts = /* GraphQL */ `
  query SyncUserContacts(
    $filter: ModelUserContactFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const listbyUserContactFriend = /* GraphQL */ `
  query ListbyUserContactFriend(
    $userID: ID!
    $friendID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListbyUserContactFriend(
      userID: $userID
      friendID: $friendID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
export const messagesByUserID = /* GraphQL */ `
  query MessagesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUserID(
      userID: $userID
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
