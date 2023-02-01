export const listbyUserContactFriend = /* GraphQL */ `
  query ListbyUserContactFriend($userID: ID!) {
    ListbyUserContactFriend(userID: $userID) {
      items {
        friend {
          status
          username
          _deleted
          _version
          id
          image
          inviteId
        }
        requestStatus
        sender
        _deleted
      }
    }
  }
`;
