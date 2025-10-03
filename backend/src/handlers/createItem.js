import { put } from "../utils/dynamodb"
import { createResponse } from "../utils/response"
import { randomUUID } from "crypto"

export async function handler(event) {
  try {
    const data = JSON.parse(event.body)

    if (!data.name || !data.description) {
      return createResponse(400, {
        error: "Name and description are required",
      })
    }

    const item = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      status: data.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: item,
    }

    await put(params).promise()

    return createResponse(201, {
      message: "Item created successfully",
      item,
    })
  } catch (error) {
    console.error("Error creating item:", error)
    return createResponse(500, {
      error: "Could not create item",
    })
  }
}
