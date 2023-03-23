export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      status
      image
      _version
      inviteId
      Blog {
        items {
          id
          createdAt
          message
          Media {
            items {
              id
              storageKey
              type
              duration
              width
              height
            }
          }
        }
      }
    }
  }
`;
