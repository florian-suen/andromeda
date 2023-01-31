export const createUserContact = /* GraphQL */ `
  mutation createUserContact($input: createUserContactInput!) {
    createUserContact(input: $input)
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
