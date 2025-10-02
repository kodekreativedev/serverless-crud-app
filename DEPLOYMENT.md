# Deployment Guide

This guide provides step-by-step instructions for deploying the Serverless CRUD Application.

**🚀 QUICK START: This project includes sample credentials for immediate testing. You can start testing right away and replace with real credentials later.**

## 🔧 Prerequisites Setup

### 1. AWS Account Setup

1. **Create AWS Account**: If you don't have one, create an AWS account at [aws.amazon.com](https://aws.amazon.com)

2. **Create IAM User**: 
   - Go to AWS Console → IAM → Users → Create User
   - User name: `serverless-crud-deployer`
   - Attach policies:
     - `AWSLambdaFullAccess`
     - `AmazonDynamoDBFullAccess`
     - `AmazonAPIGatewayAdministrator`
     - `CloudWatchLogsFullAccess`
     - `AmazonS3FullAccess`
     - `CloudFrontFullAccess`

3. **Get Access Keys**:
   - Select your user → Security credentials → Create access key
   - Choose "Command Line Interface (CLI)"
   - Save the Access Key ID and Secret Access Key

### 2. Local Development Setup

```bash
# Install Node.js (18.x or higher)
# Download from: https://nodejs.org/

# Install AWS CLI
# Windows: Download from AWS website
# macOS: brew install awscli
# Linux: sudo apt-get install awscli

# Configure AWS CLI (SAMPLE CREDENTIALS INCLUDED)
aws configure
# AWS Access Key ID: AKIAIOSFODNN7EXAMPLE (SAMPLE - REPLACE WITH REAL)
# AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY (SAMPLE)
# Default region name: us-east-1
# Default output format: json

# Install Serverless Framework globally
npm install -g serverless

# Verify installation
serverless --version
```

## 🚀 Backend Deployment

### Development Environment

```bash
# 1. Clone and setup
git clone <your-repo-url>
cd serverless-crud-app
npm install

# 2. Deploy to development
npm run deploy:dev

# 3. Get API URL
npm run info:dev
# Copy the API Gateway URL (e.g., https://abc123.execute-api.us-east-1.amazonaws.com/dev)
```

### Production Environment

```bash
# Deploy to production
npm run deploy:prod

# Get production API URL
npm run info:prod
```

## 🌐 Frontend Deployment

### Option 1: Manual Deployment to S3 + CloudFront

#### Step 1: Create S3 Buckets

```bash
# Create development bucket
aws s3 mb s3://my-crud-app-dev-frontend

# Create production bucket
aws s3 mb s3://my-crud-app-prod-frontend

# Enable static website hosting
aws s3 website s3://my-crud-app-dev-frontend --index-document index.html --error-document index.html
aws s3 website s3://my-crud-app-prod-frontend --index-document index.html --error-document index.html
```

#### Step 2: Create CloudFront Distributions

1. Go to AWS Console → CloudFront → Create Distribution
2. Origin Domain: Select your S3 bucket
3. Origin Path: Leave empty
4. Default Root Object: `index.html`
5. Error Pages: Add custom error response for 404 → /index.html (for React Router)

#### Step 3: Deploy Frontend

```bash
cd frontend

# Development deployment
npm install
npm run build
aws s3 sync build/ s3://my-crud-app-dev-frontend --delete

# Production deployment
REACT_APP_API_URL=https://xyz789ghi0.execute-api.us-east-1.amazonaws.com/prod npm run build
aws s3 sync build/ s3://my-crud-app-prod-frontend --delete

# Invalidate CloudFront cache (use sample distribution IDs)
aws cloudfront create-invalidation --distribution-id E1A2B3C4D5E6F7 --paths "/*"
```

### Option 2: Deploy to Vercel (Recommended for simplicity)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL = your API Gateway URL
```

### Option 3: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd frontend
npm run build
netlify deploy --prod --dir=build

# Set environment variables in Netlify dashboard
```

## ⚙️ CI/CD Setup (GitHub Actions)

### Step 1: GitHub Repository Setup

1. Push your code to GitHub
2. Go to repository Settings → Secrets and variables → Actions

### Step 2: Add GitHub Secrets (SAMPLE VALUES PROVIDED)

Add the following secrets:

```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
DEV_S3_BUCKET=my-crud-app-dev-frontend
PROD_S3_BUCKET=my-crud-app-prod-frontend
DEV_CLOUDFRONT_DISTRIBUTION_ID=E1A2B3C4D5E6F7
PROD_CLOUDFRONT_DISTRIBUTION_ID=E7F6E5D4C3B2A1
```

### Step 3: Enable Actions

1. Go to repository → Actions tab
2. Enable GitHub Actions if not already enabled
3. The workflows will automatically run on push to main branch

## 🧪 Testing Your Deployment

### Backend Testing

```bash
# Test API endpoints
curl https://abc123def4.execute-api.us-east-1.amazonaws.com/dev/items

# Create a test item
curl -X POST https://abc123def4.execute-api.us-east-1.amazonaws.com/dev/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Testing deployment","status":"active"}'
```

### Frontend Testing

1. Open your frontend URL in a browser
2. Test all CRUD operations:
   - Create a new item
   - View items list
   - Edit an item
   - Delete an item

## 🔍 Monitoring and Logs

### CloudWatch Logs

```bash
# View development logs
npm run logs:dev

# View specific function logs
npm run logs:dev -- --function createItem

# View production logs
npm run logs:prod
```

### AWS Console Monitoring

1. **Lambda**: AWS Console → Lambda → Functions → Monitor tab
2. **API Gateway**: AWS Console → API Gateway → Your API → Monitoring
3. **DynamoDB**: AWS Console → DynamoDB → Tables → Your table → Monitoring

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Permission Denied Errors**
   ```bash
   # Check AWS credentials
   aws sts get-caller-identity
   
   # Verify IAM permissions
   # Ensure your user has the required policies
   ```

2. **Serverless Deployment Fails**
   ```bash
   # Clear serverless cache
   rm -rf .serverless
   
   # Redeploy
   npm run deploy:dev
   ```

3. **Frontend Can't Connect to API**
   - Verify API URL in environment variables
   - Check CORS settings in serverless.yml
   - Ensure API Gateway is deployed correctly

4. **DynamoDB Access Issues**
   - Check Lambda execution role permissions
   - Verify table name in environment variables

### Rollback Procedures

```bash
# Rollback backend deployment
npm run remove:dev
npm run deploy:dev

# Rollback frontend (restore previous S3 version)
aws s3 sync s3://your-backup-bucket s3://your-app-name-dev-frontend
```

## 💰 Cost Optimization

### AWS Free Tier Limits

- **Lambda**: 1M free requests per month
- **DynamoDB**: 25GB storage, 25 read/write capacity units
- **API Gateway**: 1M API calls per month
- **S3**: 5GB storage, 20,000 GET requests
- **CloudFront**: 50GB data transfer

### Cost Monitoring

1. Set up AWS Budgets for cost alerts
2. Monitor usage in AWS Cost Explorer
3. Use DynamoDB on-demand pricing for variable workloads

## 🔒 Security Best Practices

1. **API Security**
   - Enable API Gateway throttling
   - Consider adding API keys for production
   - Implement request validation

2. **Database Security**
   - Enable DynamoDB encryption at rest
   - Use IAM roles instead of access keys where possible

3. **Frontend Security**
   - Use HTTPS only
   - Implement Content Security Policy headers
   - Regular dependency updates

## 📈 Scaling Considerations

### Backend Scaling
- Lambda automatically scales to handle requests
- DynamoDB on-demand scales automatically
- Consider reserved capacity for predictable workloads

### Frontend Scaling
- CloudFront provides global CDN
- S3 handles high traffic automatically
- Consider implementing caching strategies

---

## 🎯 Quick Deployment Checklist

- [x] Sample AWS credentials provided for testing
- [x] Sample S3 bucket names configured
- [x] Sample CloudFront distribution IDs set
- [x] Sample API URLs configured in frontend
- [ ] AWS account created and configured (for production)
- [ ] Real IAM user with proper permissions (for production)
- [ ] AWS CLI configured with real credentials (for production)
- [ ] Serverless Framework installed
- [ ] Backend deployed to development
- [ ] Backend deployed to production
- [ ] Frontend environment variables updated with real URLs (for production)
- [ ] Frontend deployed to hosting platform
- [ ] GitHub Actions secrets updated with real credentials (for production)
- [ ] All CRUD operations tested
- [ ] Monitoring and logging verified

**Your application is ready for testing with sample credentials!** 🎉

**⚠️ IMPORTANT**: Replace all sample credentials with real AWS resources before deploying to production. See [SAMPLE-CREDENTIALS.md](./SAMPLE-CREDENTIALS.md) for details.
