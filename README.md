# Serverless CRUD Application

A full-stack serverless application built with AWS Lambda, API Gateway, DynamoDB, and React. This project demonstrates a complete CRUD (Create, Read, Update, Delete) application with modern CI/CD practices.

** QUICK START: This project includes sample credentials for immediate testing. See [SAMPLE-CREDENTIALS.md](./SAMPLE-CREDENTIALS.md) for details.**

## Architecture

### Backend
- **AWS Lambda**: Serverless compute for API endpoints
- **API Gateway**: RESTful API management
- **DynamoDB**: NoSQL database for data storage
- **Serverless Framework**: Infrastructure as Code (IaC)

### Frontend
- **React**: Modern UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **React Toastify**: Toast notifications

### CI/CD
- **GitHub Actions**: Automated testing and deployment
- **Multi-stage deployments**: Development, Production, and PR previews
- **AWS S3 + CloudFront**: Frontend hosting and CDN

##  Quick Start

### Prerequisites

1. **AWS Account**: You'll need an AWS account with appropriate permissions
2. **Node.js**: Version 18.x or higher
3. **AWS CLI**: Configured with your credentials
4. **Serverless Framework**: Install globally with `npm install -g serverless`

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd serverless-crud-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AWS credentials (SAMPLE INCLUDED)**
   ```bash
   # For testing: Use the sample credentials in SAMPLE-CREDENTIALS.md
   # For production: Replace with real credentials
   aws configure
   # AWS Access Key ID: AKIAIOSFODNN7EXAMPLE (SAMPLE - REPLACE WITH REAL)
   # AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY (SAMPLE)
   # Default region name: us-east-1
   # Default output format: json
   ```

4. **Deploy to development**
   ```bash
   npm run deploy:dev
   ```

5. **Get your API URL**
   ```bash
   npm run info:dev
   ```
   Copy the API Gateway URL from the output.

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

## 🔧 Configuration

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

#### For Frontend Deployment (Optional)
- S3 bucket for static hosting
- CloudFront distribution for CDN
- Route 53 for custom domain (optional)

##  Deployment

### Manual Deployment

#### Development
```bash
# Backend
npm run deploy:dev

# Frontend
cd frontend
npm run build
# Upload build/ folder to your hosting service
```

#### Production
```bash
# Backend
npm run deploy:prod

# Frontend
cd frontend
REACT_APP_API_URL=<your-prod-api-url> npm run build
# Upload build/ folder to your hosting service
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

##  API Endpoints

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

##  Testing

### Backend Testing
```bash
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
1. Start the backend locally: `npm run dev`
2. Start the frontend locally: `cd frontend && npm start`
3. Test all CRUD operations through the UI

## 📊 Monitoring

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

##  Troubleshooting

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

## Scaling Considerations

### Backend
- Lambda automatically scales based on demand
- DynamoDB uses on-demand billing for automatic scaling
- API Gateway handles high traffic loads

### Frontend
- CloudFront CDN for global distribution
- S3 for static asset hosting
- Consider implementing caching strategies

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

##  Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review AWS CloudWatch logs
3. Open an issue on GitHub
4. Contact the development team

##  Useful Links

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)

---

**Entry Point URL**: After deployment, your React application will be available at the URL provided by your hosting service (S3 + CloudFront or other hosting platform).

**Sample API URL**: `https://abc123def4.execute-api.us-east-1.amazonaws.com/dev`

** IMPORTANT**: The credentials and URLs in this project are SAMPLE/FAKE values for testing. Replace them with real AWS credentials and resources before deploying to production. See [SAMPLE-CREDENTIALS.md](./SAMPLE-CREDENTIALS.md) for details.
