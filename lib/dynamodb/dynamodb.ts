import {
  CreateTableCommand,
  CreateTableInput,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// Create a new DynamoDB client
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

// Function to get an item from DynamoDB
export async function getItem(tableName: string, key: any) {
  const params = {
    TableName: tableName,
    Key: marshall(key),
  };

  try {
    const command = new GetItemCommand(params);
    const data = await dynamoDBClient.send(command);
    if (!data.Item) {
      throw new Error(`Item not found in DynamoDB table ${tableName}`);
    }
    return unmarshall(data.Item);
  } catch (error) {
    console.error(
      `Error getting item from DynamoDB table ${tableName}:`,
      error,
    );
    throw error;
  }
}

// Function to put an item in DynamoDB
export async function putItem(tableName: string, item: any) {
  const params = {
    TableName: tableName,
    Item: marshall(item),
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
    console.log(`Item successfully put in DynamoDB table ${tableName}`);
  } catch (error) {
    console.error(`Error putting item in DynamoDB table ${tableName}:`, error);
    throw error;
  }
}
