import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from ".";
import { Post } from "@/components/post";

const TableName = "PostStats";

export async function incrementViewCount(postId: Post["id"]) {
  const params = {
    TableName,
    Key: marshall({ postId }),
    UpdateExpression: "ADD #viewCount :increment",
    ExpressionAttributeNames: {
      "#viewCount": "viewCount",
    },
    ExpressionAttributeValues: marshall({
      ":increment": 1,
    }),
    ReturnValues: "ALL_NEW",
  } as UpdateItemCommandInput;

  try {
    const command = new UpdateItemCommand(params);
    const data = await dynamoDBClient.send(command);
    return unmarshall(data.Attributes ?? {});
  } catch (error) {
    console.error(
      `Error incrementing view count for post ${postId} in DynamoDB:`,
      error,
    );
    throw error;
  }
}

export async function addPost(postId: Post["id"]) {
  const params = {
    TableName,
    Item: marshall({
      postId,
      viewCount: 0,
      favouriteCount: 0,
    }),
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
  } catch (error) {
    console.error(`Error adding post ${postId} to DynamoDB:`, error);
    throw error;
  }
}

export async function getPostStats(postId: Post["id"]) {
  const params = {
    TableName,
    Key: marshall({ postId }),
  };

  try {
    const command = new GetItemCommand(params);
    const data = await dynamoDBClient.send(command);
    return unmarshall(data.Item ?? {});
  } catch (error) {
    console.error(
      `Error getting post stats for post ${postId} from DynamoDB:`,
      error,
    );
    throw error;
  }
}

export async function incrementFavouriteCount(postId: Post["id"]) {
  const params = {
    TableName,
    Key: marshall({ postId }),
    UpdateExpression: "ADD #favouriteCount :increment",
    ExpressionAttributeNames: {
      "#favouriteCount": "favouriteCount",
    },
    ExpressionAttributeValues: marshall({
      ":increment": 1,
    }),
    ReturnValues: "ALL_NEW",
  } as UpdateItemCommandInput;

  try {
    const command = new UpdateItemCommand(params);
    const data = await dynamoDBClient.send(command);
    return unmarshall(data.Attributes ?? {});
  } catch (error) {
    console.error(
      `Error incrementing favourite count for post ${postId} in DynamoDB:`,
      error,
    );
    throw error;
  }
}

export async function decrementFavouriteCount(postId: Post["id"]) {
  const params = {
    TableName,
    Key: marshall({ postId }),
    UpdateExpression: "ADD #favouriteCount :decrement",
    ExpressionAttributeNames: {
      "#favouriteCount": "favouriteCount",
    },
    ExpressionAttributeValues: marshall({
      ":decrement": -1,
    }),
    ReturnValues: "ALL_NEW",
  } as UpdateItemCommandInput;

  try {
    const command = new UpdateItemCommand(params);
    const data = await dynamoDBClient.send(command);
    return unmarshall(data.Attributes ?? {});
  } catch (error) {
    console.error(
      `Error decrementing favourite count for post ${postId} in DynamoDB:`,
      error,
    );
    throw error;
  }
}
