import {
  CreateTableCommand,
  CreateTableInput,
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

async function createPostStatsTableIfNotExists() {
  try {
    await dynamoDBClient.send(
      new GetItemCommand({
        TableName: "PostStats",
        Key: marshall({ postId: "fakeId" }),
      }),
    );
  } catch (error: any) {
    if (error.name === "ResourceNotFoundException") {
      // Table doesn't exist, create it
      const params: CreateTableInput = {
        TableName: "PostStats",
        KeySchema: [{ AttributeName: "postId", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "postId", AttributeType: "S" }],
        BillingMode: "PAY_PER_REQUEST",
      };

      await dynamoDBClient.send(new CreateTableCommand(params));
    } else {
      // Unexpected error
      throw error;
    }
  }
}

createPostStatsTableIfNotExists();

export * from "./post-stats";
export * from "./s3";
