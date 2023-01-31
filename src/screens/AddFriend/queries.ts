export const createUserContact = /* GraphQL */ `
  mutation createUserContact($input: createUserContactInput!) {
    createUserContact(input: $input)
  }
`;

export const getUserByInviteId = /* GraphQL */ `
  query userByInviteId($id: String!) {
    userByInviteId(inviteId: $id) {
      items {
        username
        status
        image
        inviteId
      }
    }
  }
`;
