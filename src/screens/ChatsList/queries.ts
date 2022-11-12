export const GetUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatGroups(sortDirection: DESC) {
        items {
          Chatgroup {
            id
            users {
              items {
                user {
                  id
                  image
                  username
                }
                Chatgroup {
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
          Chatgroup {
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
