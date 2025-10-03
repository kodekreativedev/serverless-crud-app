# Serverless CRUD Application

A full-stack serverless application built with AWS Lambda, API Gateway, DynamoDB, and React. This project demonstrates a complete CRUD (Create, Read, Update, Delete).

### AWS Resources Created

#### Backend Resources (Auto-created by Serverless Framework)
- **Lambda Functions**: 6 functions for CRUD operations + CORS
- **API Gateway**: HTTP API with CORS enabled
- **DynamoDB Table**: `serverless-crud-api-{stage}-items`
- **IAM Roles**: Execution roles with DynamoDB permissions
- **CloudWatch Logs**: Function loggingodern CI/CD practices.

** QUICK START: This project includes sample credentials for immediate testing.**

##  Architecture

### Backend
- **AWS Lambda**: Serverless compute for API endpoints (Node.js 18.x)
- **API Gateway**: HTTP API management with CORS support
- **DynamoDB**: NoSQL database for data storage
- **Serverless Framework v3**: Infrastructure as Code (IaC)

### Frontend
- **React 18**: Modern UI library with Create React App
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **React Toastify**: Toast notifications

### CI/CD
- **GitHub Actions**: Automated testing and deployment
- **Multi-stage deployments**: Development and Production
- **Webpack**: Module bundling via Serverless Framework

##  Quick Start

### ⚡ Super Quick Setup (2 minutes)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd serverless-crud-app

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Start development servers
cd ../backend && npm run offline    # Terminal 1: Backend API
cd frontend && npm start            # Terminal 2: React App
```

Visit: http://localhost:3000

### Prerequisites for AWS Deployment

1. **AWS Account** with appropriate permissions
2. **Node.js** 18.x or higher
3. **AWS CLI** configured with credentials
4. **Serverless Framework**: `npm install -g serverless`

##  Environment Variables

### Backend Environment Variables

#### Auto-configured by Serverless Framework
```bash
# These are automatically set by serverless.yml
DYNAMODB_TABLE=serverless-crud-api-{stage}-items  # Auto-generated table name
STAGE=dev                                         # Deployment stage (dev/prod)
```

#### AWS Runtime Environment Variables (Set by AWS)
```bash
AWS_REGION=us-east-1                             # AWS region for resources
AWS_LAMBDA_FUNCTION_NAME=serverless-crud-api-dev-{functionName}
AWS_LAMBDA_FUNCTION_VERSION=$LATEST
```

###  Frontend Environment Variables

#### Required for API Communication
Create a `.env` file in the `frontend/` folder:
```bash
# API Gateway URL (get this after backend deployment)
REACT_APP_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/dev

# Environment setting (development or production)
REACT_APP_ENVIRONMENT=development
```

#### Optional Frontend Environment Variables
```bash
# For production builds
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod

# For debugging (optional)
REACT_APP_DEBUG=true
```

### AWS Credentials Setup

#### For Local Development
```bash
# Method 1: AWS CLI configuration
aws configure
# AWS Access Key ID: [YOUR_ACCESS_KEY_ID]
# AWS Secret Access Key: [YOUR_SECRET_ACCESS_KEY]
# Default region name: us-east-1
# Default output format: json

# Method 2: Environment variables (alternative)
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_DEFAULT_REGION=us-east-1
```

#### For GitHub Actions CI/CD
Add these secrets in GitHub Repository Settings → Secrets and Variables → Actions:
```bash
# Required for deployment
AWS_ACCESS_KEY_ID=your_real_access_key_id
AWS_SECRET_ACCESS_KEY=your_real_secret_access_key

# Optional: specify region if different from default
AWS_DEFAULT_REGION=us-east-1
```

### Deployment

**Backend (from `/backend` folder):**
```bash
cd backend

# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod

# Get deployment info
npm run info:dev
npm run info:prod

# Remove deployments
npm run remove:dev
npm run remove:prod
```

**Frontend:**
- Update `frontend/src/config/api.js` with your API Gateway URL
- Build for production: `npm run build`

### 🛠️ Development Scripts

**Backend (from `/backend` folder):**
```bash
# Install dependencies
npm install

# Development
npm run offline            # Run serverless offline (local API)
npm run deploy:dev         # Deploy to AWS dev environment
npm run deploy:prod        # Deploy to AWS production
npm run info:dev          # Get dev deployment info
npm run logs:dev          # View dev logs
npm run remove:dev        # Remove dev deployment
```

**Frontend (from `/frontend` folder):**
```bash
# Install dependencies
npm install

# Development
npm start                  # Run React dev server (localhost:3000)
npm run build             # Build for production
npm run build:dev         # Build with dev environment
npm run build:prod        # Build with prod environment
npm test                  # Run tests
```

### 🔧 AWS Setup for Production

1. **Create IAM User** with policies:
   - `AWSLambdaFullAccess`
   - `AmazonDynamoDBFullAccess`  
   - `AmazonAPIGatewayAdministrator`
   - `CloudWatchLogsFullAccess`

2. **Configure AWS CLI:**
   ```bash
   aws configure
   # AWS Access Key ID: [Your real access key]
   # AWS Secret Access Key: [Your real secret key]
   # Default region name: us-east-1
   # Default output format: json
   ```

3. **Add GitHub Secrets** (for CI/CD):
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (SAMPLE INCLUDED)**
   ```bash
   # The .env file is already configured with sample API URL
   # For production: Update REACT_APP_API_URL with your real API Gateway URL
   ```

4. **Start development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

##  Configuration

### Environment Variables

#### Backend
- `DYNAMODB_TABLE`: DynamoDB table name (auto-configured)
- `STAGE`: Deployment stage (dev/prod)
- `LOG_LEVEL`: Logging level

#### Frontend
- `REACT_APP_API_URL`: Your API Gateway URL
- `REACT_APP_ENVIRONMENT`: Environment name

### AWS Resources Required

#### For Backend Deployment
- AWS Lambda execution role
- DynamoDB table permissions
- API Gateway permissions
- CloudWatch Logs permissions

##  Deployment

### Manual Deployment

#### Backend Deployment
```bash
cd backend

# Deploy to development
npm run deploy:dev

# Deploy to production  
npm run deploy:prod

# Get API Gateway URL after deployment
npm run info:dev    # Copy the API Gateway URL
```

#### Frontend Deployment
```bash
cd frontend

```

### Automated Deployment (CI/CD)

The project includes GitHub Actions workflows for automated deployment:

1. **Setup GitHub Secrets (SAMPLE VALUES PROVIDED)**
   
   Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

   ```
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   DEV_S3_BUCKET=my-crud-app-dev-frontend
   PROD_S3_BUCKET=my-crud-app-prod-frontend
   DEV_CLOUDFRONT_DISTRIBUTION_ID=E1A2B3C4D5E6F7
   PROD_CLOUDFRONT_DISTRIBUTION_ID=E7F6E5D4C3B2A1
   ```

The CI/CD pipeline will automatically:
- Run tests
- Deploy backend to development
- Deploy frontend to development
- Deploy backend to production (after dev success)
- Deploy frontend to production

## 📱 API Endpoints

### Base URL
- **Development**: `https://abc123def4.execute-api.us-east-1.amazonaws.com/dev` (SAMPLE)
- **Production**: `https://xyz789ghi0.execute-api.us-east-1.amazonaws.com/prod` (SAMPLE)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all items |
| GET | `/items/{id}` | Get item by ID |
| POST | `/items` | Create new item |
| PUT | `/items/{id}` | Update item |
| DELETE | `/items/{id}` | Delete item |

### Request/Response Examples

#### Create Item
```bash
curl -X POST https://abc123def4.execute-api.us-east-1.amazonaws.com/dev/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Item",
    "description": "This is a sample item",
    "status": "active"
  }'
```

#### Response
```json
{
  "message": "Item created successfully",
  "item": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Sample Item",
    "description": "This is a sample item",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Manual Testing
1. Start the backend locally: `npm run dev`
2. Start the frontend locally: `cd frontend && npm start`
3. Test all CRUD operations through the UI

## Monitoring

### CloudWatch Logs
- View Lambda function logs in AWS CloudWatch
- Monitor API Gateway access logs
- Track DynamoDB metrics

### Commands
```bash
# View development logs
npm run logs:dev

# View production logs
npm run logs:prod
```

##  Security Considerations

1. **API Gateway**: CORS is configured for cross-origin requests
2. **DynamoDB**: Uses IAM roles for access control
3. **Lambda**: Minimal permissions principle
4. **Frontend**: Environment variables for configuration

### Common Issues

1. **Deployment fails with permissions error**
   - Ensure your AWS credentials have sufficient permissions
   - Check IAM policies for Lambda, DynamoDB, and API Gateway

2. **Frontend can't connect to API**
   - Verify the API URL in your environment variables
   - Check CORS configuration in serverless.yml

3. **DynamoDB access denied**
   - Ensure the Lambda execution role has DynamoDB permissions
   - Check the table name matches the environment variable

### Useful Commands

```bash
# Check serverless info
npm run info:dev
npm run info:prod

# Remove deployments
npm run remove:dev
npm run remove:prod

# View logs
npm run logs:dev -- --function createItem
```

### Common Issues

**Permission Denied Errors:**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Verify IAM permissions in AWS Console
```

**Serverless Deployment Fails:**
```bash
# Clear serverless cache
rm -rf backend/.serverless

# Redeploy
npm run deploy:dev
```

**Frontend Can't Connect to API:**
- Verify API URL in `frontend/src/services/itemService.js`
- Check CORS settings in `backend/serverless.yml`
- Ensure API Gateway is deployed correctly

**CI/CD Pipeline Fails:**
- Add required GitHub Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- Check CloudWatch logs for deployment errors

### Monitoring & Logs

```bash

npm run logs:dev

```
## Useful Links

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)

**Sample API URL**: `https://abc123def4.execute-api.us-east-1.amazonaws.com/dev`

