import { API, graphqlOperation } from "aws-amplify";
import { deleteUserChatGroup } from "../../../graphql/mutations";
export const removeUserHandler = (userChatGroup: {
  _version: string;
  id: string;
}) => {
  API.graphql(
    graphqlOperation(deleteUserChatGroup, {
      input: {
        _version: userChatGroup._version,
        id: userChatGroup.id,
      },
    })
  );
};
