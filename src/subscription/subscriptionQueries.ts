export const onUpdateUserContact = /* GraphQL */ `
  subscription OnUpdateUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onUpdateUserContact(filter: $filter) {
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

export const onCreateUserContact = /* GraphQL */ `
  subscription OnCreateUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onCreateUserContact(filter: $filter) {
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
