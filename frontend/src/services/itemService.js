import axios from "axios"

// Replace with your actual API Gateway URL after deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://abc123def4.execute-api.us-east-1.amazonaws.com/dev"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const itemService = {
  async getItems() {
    const response = await api.get("/items")
    return response.data
  },

  async getItem(id) {
    const response = await api.get(`/items/${id}`)
    return response.data
  },

  async createItem(item) {
    const response = await api.post("/items", item)
    return response.data
  },

  async updateItem(id, item) {
    const response = await api.put(`/items/${id}`, item)
    return response.data
  },

  async deleteItem(id) {
    const response = await api.delete(`/items/${id}`)
    return response.data
  },
}
