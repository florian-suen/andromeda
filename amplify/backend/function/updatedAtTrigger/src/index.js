import { default as fetch, Request } from "node-fetch";
import { updateUserChatGroup, listUserChatGroups } from "./queries.js";
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const GRAPHQL_ENDPOINT = process.env.API_ANDROMEDA_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_ANDROMEDA_GRAPHQLAPIKEYOUTPUT;

export const handler = (event) => {
  event.Records.forEach(async (record) => {
    if (
      record?.dynamodb.NewImage?.updatedAt?.S &&
      record?.dynamodb.NewImage?.updatedAt?.S !==
        record?.dynamodb.OldImage?.updatedAt?.S
    ) {
      const chatGroupId = record?.dynamodb.NewImage?.id?.S;
      const newUpdatedAt = record?.dynamodb.NewImage?.updatedAt?.S;

      const listInputVariables = {
        filter: { chatgroupID: { eq: chatGroupId } },
      };

      const createOptions = (query, options) => {
        return {
          method: "POST",
          headers: { "x-api-key": GRAPHQL_API_KEY },
          body: JSON.stringify({ query, variables: options }),
        };
      };

      const request = new Request(
        GRAPHQL_ENDPOINT,
        createOptions(listUserChatGroups, listInputVariables)
      );
      let listResponse, body;
      let statusCode = 200;
      try {
        listResponse = await fetch(request);
        body = await listResponse.json();
        if (body.errors) statusCode = 400;
      } catch (error) {
        statusCode = 400;
        body = {
          errors: [
            {
              status: listResponse.status,
              message: error.message,
              stack: error.stack,
            },
          ],
        };
      }

      body && console.log(statusCode, JSON.stringify(body));

      if (body.data.listUserChatGroups.items.length) {
        body.data.listUserChatGroups.items.map(async (chatGroups) => {
          const updateInputVariable = {
            input: {
              id: chatGroups.id,
              _version: chatGroups._version,
              updatedAt: newUpdatedAt,
            },
          };

          const request = new Request(
            GRAPHQL_ENDPOINT,
            createOptions(updateUserChatGroup, updateInputVariable)
          );
          let updateResponse, body;
          let statusCode = 200;
          try {
            updateResponse = await fetch(request);
            body = await updateResponse.json();
            if (body.errors) statusCode = 400;
          } catch (error) {
            statusCode = 400;
            body = {
              errors: [
                {
                  status: updateResponse.status,
                  message: error.message,
                  stack: error.stack,
                },
              ],
            };
          }

          body && console.log(statusCode, JSON.stringify(body));
        });
      }
    }
  });
};
