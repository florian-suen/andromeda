export const createUserContact = /* GraphQL */ `
  mutation createUserContact($input: CreateUserContactInput!) {
    createUserContact(input: $input) {
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
`;

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
        userContact {
          id
        }
        requestStatus
        sender
        _deleted
        id
      }
    }
  }
`;

export const getUserByInviteId = /* GraphQL */ `
  query userByInviteId($inviteId: String!) {
    userByInviteId(inviteId: $inviteId) {
      items {
        id
        username
        status
        image
        inviteId
      }
    }
  }
`;

export const updateUserContact = /* GraphQL */ `
  mutation updateUserContact($input: UpdateUserContactInput!) {
    updateUserContact(input: $input) {
      id
      sender
      requestStatus
      _version
    }
  }
`;
