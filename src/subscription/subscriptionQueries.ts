export const onUpdateUserContact = /* GraphQL */ `
  subscription OnUpdateUserContact(
    $filter: ModelSubscriptionUserContactFilterInput
  ) {
    onUpdateUserContact(filter: $filter) {
      id
      sender
      requestStatus
      _version
    }
  }
`;
