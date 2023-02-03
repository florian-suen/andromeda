export const listbyUserContactFriend = /* GraphQL */ `
  query ListbyUserContactFriend($userID: ID!) {
    ListbyUserContactFriend(userID: $userID) {
      items {
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
        }
      }
    }
  }
`;
