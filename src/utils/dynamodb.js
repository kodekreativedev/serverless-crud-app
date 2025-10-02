import { DynamoDB } from "aws-sdk"

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || "us-east-1",
  ...(process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8000",
  }),
})

export default dynamoDb

// Export individual methods for convenience
export const scan = (params) => dynamoDb.scan(params)
export const get = (params) => dynamoDb.get(params)
export const put = (params) => dynamoDb.put(params)
export const update = (params) => dynamoDb.update(params)
export const deleteItem = (params) => dynamoDb.delete(params)
