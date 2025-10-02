import { createResponse } from '../utils/response'

export const handler = async () => {
  return createResponse(200, { message: 'CORS preflight response' })
}