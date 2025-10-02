const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || "https://abc123def4.execute-api.us-east-1.amazonaws.com/dev",
    environment: "development",
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || "https://xyz789ghi0.execute-api.us-east-1.amazonaws.com/prod",
    environment: "production",
  },
}

const currentEnv = process.env.REACT_APP_ENVIRONMENT || "development"

export default {
  ...config[currentEnv],
  // Sample API endpoints for reference
  endpoints: {
    items: "/items",
    item: (id) => `/items/${id}`,
  },
  // Sample configuration values
  timeout: 10000,
  retries: 3,
}
