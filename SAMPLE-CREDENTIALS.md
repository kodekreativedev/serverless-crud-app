# Sample Credentials for Testing

**⚠️ IMPORTANT: These are FAKE credentials for testing only. Replace with real values before deploying to production.**

## AWS Credentials (GitHub Secrets)

Add these to your GitHub repository secrets:

```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

## S3 Bucket Names (GitHub Secrets)

```
DEV_S3_BUCKET=my-crud-app-dev-frontend
PROD_S3_BUCKET=my-crud-app-prod-frontend
```

## CloudFront Distribution IDs (GitHub Secrets)

```
DEV_CLOUDFRONT_DISTRIBUTION_ID=E1A2B3C4D5E6F7
PROD_CLOUDFRONT_DISTRIBUTION_ID=E7F6E5D4C3B2A1
```

## API Gateway URLs (Auto-generated)

Development: `https://abc123def4.execute-api.us-east-1.amazonaws.com/dev`
Production: `https://xyz789ghi0.execute-api.us-east-1.amazonaws.com/prod`

## Local Development

For local testing with serverless-offline:
```
REACT_APP_API_URL=http://localhost:3001/dev
```

## How to Replace with Real Credentials

1. **AWS Account Setup:**
   - Create AWS account
   - Create IAM user with programmatic access
   - Attach policies: AWSLambdaFullAccess, AmazonDynamoDBFullAccess, AmazonAPIGatewayAdministrator
   - Get real AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

2. **S3 Buckets:**
   - Create S3 buckets for dev and prod frontend hosting
   - Enable static website hosting
   - Update bucket names in GitHub secrets

3. **CloudFront (Optional):**
   - Create CloudFront distributions for your S3 buckets
   - Update distribution IDs in GitHub secrets

4. **GitHub Secrets:**
   - Go to your repository Settings > Secrets and variables > Actions
   - Add all the credentials as repository secrets
```
