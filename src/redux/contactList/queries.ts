export const listbyUserContactFriend = /* GraphQL */ `
  query ListbyUserContactFriend($userID: ID!) {
    ListbyUserContactFriend(userID: $userID) {
      items {
        sender
        requestStatus
        _deleted
        _version
        userContact {
          id
          _version
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
