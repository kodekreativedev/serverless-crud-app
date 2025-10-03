import { get } from "../utils/dynamodb"
import { createResponse } from "../utils/response"

export async function handler(event) {
  try {
    const { id } = event.pathParameters

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
    }

    const result = await get(params).promise()

    if (!result.Item) {
      return createResponse(404, {
        error: "Item not found",
      })
    }

    return createResponse(200, {
      item: result.Item,
    })
  } catch (error) {
    console.error("Error fetching item:", error)
    return createResponse(500, {
      error: "Could not fetch item",
    })
  }
}
