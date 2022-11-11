export const updateUserChatGroup = /* GraphQL */ `
  mutation UpdateUserChatGroup($input: UpdateUserChatGroupInput!) {
    updateUserChatGroup(input: $input) {
      id
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
        _version
        updatedAt
      }
    }
  }
`;
