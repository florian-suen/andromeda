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
        Media {
          items {
            id
            storageKey
            type
            messageID
            chatgroupID
            duration
            width
            height
          }
        }

        Attachments {
          items {
            chatgroupID
            createdAt
            id
            messageID
            updatedAt
            type
            storageKey
            name
            _version
            _lastChangedAt
            _deleted
          }
        }
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
