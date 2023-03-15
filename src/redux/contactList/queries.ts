export const listbyUserContactFriend = /* GraphQL */ `
  query ListbyUserContactFriend($userID: ID!) {
    ListbyUserContactFriend(userID: $userID) {
      items {
        updatedAt
        createdAt
        sender
        requestStatus
        _deleted
        _version
        friendID
        userContact {
          id
          _version
          requestStatus
        }
        id
        friend {
          inviteId
          image
          username
          id
          status
          _deleted

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
    }
  }
`;
