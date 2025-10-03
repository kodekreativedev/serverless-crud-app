import { get, deleteItem as deleteFromDb } from "../utils/dynamodb"
import { createResponse } from "../utils/response"

export async function handler(event) {
  try {
    const { id } = event.pathParameters

    // Check if item exists
    const getParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
    }

    const existingItem = await get(getParams).promise()
    if (!existingItem.Item) {
      return createResponse(404, {
        error: "Item not found",
      })
    }

    const deleteParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
    }

    await deleteFromDb(deleteParams).promise()

    return createResponse(200, {
      message: "Item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting item:", error)
    return createResponse(500, {
      error: "Could not delete item",
    })
  }
}
