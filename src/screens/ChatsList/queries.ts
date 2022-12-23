import { Image } from "react-native";
export const GetUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatGroups(sortDirection: DESC) {
        items {
          _deleted
          Chatgroup {
            leaderID
            _version
            name
            image
            LastMessage {
              id
              createdAt
              message
            }
            id
            users {
              items {
                userID
                _version
                id
                _deleted
                user {
                  id
                  image
                  username
                }
                Chatgroup {
                  _version
                  id
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
