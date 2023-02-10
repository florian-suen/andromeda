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

export const onDeleteUserContact = /* GraphQL */ `
  subscription OnDeleteUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onDeleteUserContact(filter: $filter) {
      id
      userID
    }
  }
`;

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
      id
      userID
      createdAt
      message
      comments {
        nextToken
        startedAt
      }
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
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
