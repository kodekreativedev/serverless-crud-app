import { scan } from "../utils/dynamodb"
import { createResponse } from "../utils/response"

export async function handler(event) {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    }

    const result = await scan(params).promise()

    return createResponse(200, {
      items: result.Items,
      count: result.Count,
    })
  } catch (error) {
    console.error("Error fetching items:", error)
    return createResponse(500, {
      error: "Could not fetch items",
    })
  }
}
