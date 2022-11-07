export const GetUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatGroups {
        items {
          chatGroup {
            id
            users {
              items {
                user {
                  id
                  image
                  username
                }
                chatGroup {
                  LastMessage {
                    id
                    createdAt
                    message
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ChatGroupList = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatGroups {
        items {
          chatGroup {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
