import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "@/lib/dynamodb";
import { House } from "@/components/house";

const TableName = "HouseStats";

export async function incrementViewCount(houseId: House["id"]) {
  const params = {
    TableName,
    Key: marshall({ houseId }),
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
      `Error incrementing view count for house ${houseId} in DynamoDB:`,
      error,
    );
    throw error;
  }
}

export async function addHouse(houseId: House["id"]) {
  const params = {
    TableName,
    Item: marshall({
      houseId,
      viewCount: 0,
      favouriteCount: 0,
    }),
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
  } catch (error) {
    console.error(`Error adding house ${houseId} to DynamoDB:`, error);
    throw error;
  }
}

export async function getHoueStats(houseId: House["id"]) {
  const params = {
    TableName,
    Key: marshall({ houseId }),
  };

  try {
    const command = new GetItemCommand(params);
    const data = await dynamoDBClient.send(command);
    return unmarshall(data.Item ?? {});
  } catch (error) {
    console.error(
      `Error getting house stats for house ${houseId} from DynamoDB:`,
      error,
    );
    throw error;
  }
}
