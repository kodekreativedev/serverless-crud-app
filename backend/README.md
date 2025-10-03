# Serverless CRUD Backend

This is the backend API for the Serverless CRUD application.

## Structure

```
backend/
├── src/
│   ├── handlers/          # Lambda function handlers
│   │   ├── createItem.js
│   │   ├── getItems.js
│   │   ├── getItem.js
│   │   ├── updateItem.js
│   │   ├── deleteItem.js
│   │   └── optionsHandler.js
│   └── utils/             # Utility functions
│       ├── dynamodb.js
│       └── response.js
├── serverless.yml         # Main serverless configuration
├── serverless-dev.yml     # Development stage config
├── serverless-prod.yml    # Production stage config
├── webpack.config.js      # Webpack configuration for Lambda
├── .babelrc              # Babel configuration
└── package.json           # Backend dependencies and scripts
```

## Scripts

- `npm run deploy:dev` - Deploy to development stage
- `npm run deploy:prod` - Deploy to production stage
- `npm run info:dev` - Get development API info
- `npm run info:prod` - Get production API info
- `npm run offline` - Run serverless offline for local development
- `npm run remove:dev` - Remove development stack
- `npm run remove:prod` - Remove production stack

## Development

1. Install dependencies: `npm install`
2. Deploy to dev: `npm run deploy:dev`
3. Get API URL: `npm run info:dev`