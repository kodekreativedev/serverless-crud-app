import { get, update } from "../utils/dynamodb"
import { createResponse } from "../utils/response"

export async function handler(event) {
  try {
    const { id } = event.pathParameters
    const data = JSON.parse(event.body)

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

    const updateParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
      UpdateExpression: "SET #name = :name, description = :description, #status = :status, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":name": data.name || existingItem.Item.name,
        ":description": data.description || existingItem.Item.description,
        ":status": data.status || existingItem.Item.status,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    }

    const result = await update(updateParams).promise()

    return createResponse(200, {
      message: "Item updated successfully",
      item: result.Attributes,
    })
  } catch (error) {
    console.error("Error updating item:", error)
    return createResponse(500, {
      error: "Could not update item",
    })
  }
}
