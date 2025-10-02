# 🚀 Quick Start Guide

Get your Serverless CRUD application running in 5 minutes with sample credentials!

## ⚡ Super Quick Setup (1 minute)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd serverless-crud-app
npm install
cd frontend && npm install && cd ..

# 2. Test with samples (everything is pre-configured!)
chmod +x test-with-samples.sh
./test-with-samples.sh
```

## 🎯 What's Pre-Configured

✅ **Sample AWS Credentials**: Ready for testing (fake, but realistic)
✅ **Sample API URLs**: Frontend points to example endpoints  
✅ **Sample S3 Buckets**: CI/CD configured with example bucket names
✅ **Sample CloudFront IDs**: CDN distribution IDs ready
✅ **Environment Variables**: All .env files configured

## 🧪 Test Locally (2 minutes)

```bash
# Terminal 1: Start backend (will use sample config)
npm run dev

# Terminal 2: Start frontend
cd frontend
npm start
```

Visit: http://localhost:3000

## 🔄 Replace with Real Credentials

When ready for production:

1. **Get Real AWS Credentials**:
   - Create AWS account
   - Create IAM user with permissions
   - Get Access Key ID and Secret Key

2. **Update Configuration**:
   ```bash
   # Update AWS CLI
   aws configure
   
   # Update frontend/.env
   REACT_APP_API_URL=https://your-real-api-url.com
   
   # Update GitHub secrets (see SAMPLE-CREDENTIALS.md)
   ```

3. **Deploy for Real**:
   ```bash
   npm run deploy:dev
   ```

## 📋 Sample Values Reference

| Component | Sample Value | Replace With |
|-----------|--------------|--------------|
| API URL (Dev) | `https://abc123def4.execute-api.us-east-1.amazonaws.com/dev` | Your real API Gateway URL |
| API URL (Prod) | `https://xyz789ghi0.execute-api.us-east-1.amazonaws.com/prod` | Your real production URL |
| AWS Access Key | `AKIAIOSFODNN7EXAMPLE` | Your real access key |
| AWS Secret Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Your real secret key |
| S3 Bucket (Dev) | `my-crud-app-dev-frontend` | Your real dev bucket |
| S3 Bucket (Prod) | `my-crud-app-prod-frontend` | Your real prod bucket |
| CloudFront (Dev) | `E1A2B3C4D5E6F7` | Your real distribution ID |
| CloudFront (Prod) | `E7F6E5D4C3B2A1` | Your real distribution ID |

## 🆘 Need Help?

- **Setup Issues**: Run `./test-with-samples.sh` to diagnose
- **Deployment Issues**: Check AWS credentials and permissions
- **Frontend Issues**: Verify API URL in `frontend/.env`
- **CI/CD Issues**: Update GitHub secrets with real values

## 🎉 You're Ready!

Your serverless CRUD application is configured and ready to test. The sample credentials let you explore the codebase and understand the deployment process before committing to real AWS resources.

**Next**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment steps.
```

```gitignore file="" isHidden
