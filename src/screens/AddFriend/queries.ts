export const createUserContact = /* GraphQL */ `
  mutation createUserContact($input: CreateUserContactInput!) {
    createUserContact(input: $input) {
      id
      sender
      requestStatus
      _deleted
      _version
      userID
      userContact {
        id
        _version
      }
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
      userID
      friendID
      userContact {
        id
        requestStatus
        _version
      }
    }
  }
`;

export const deleteUserContact = /* GraphQL */ `
  mutation DeleteUserContact(
    $input: DeleteUserContactInput!
    $condition: ModelUserContactConditionInput
  ) {
    deleteUserContact(input: $input, condition: $condition) {
      id
    }
  }
`;
