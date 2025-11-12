# Railway Deployment Checklist

## ✅ Pre-Deployment Checklist:

### 1. Code is on GitHub ✅ 
- Repository: https://github.com/pankajkumawat15m/krashak-backend.git

### 2. Required Files ✅
- ✅ Procfile created
- ✅ package.json with start script
- ✅ .gitignore configured
- ✅ Server.js with production config

### 3. Railway Deployment Steps:

#### Step A: Create Railway Project
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select: pankajkumawat15m/krashak-backend
6. Click "Deploy Now"

#### Step B: Add Environment Variables
In Railway dashboard, go to Variables tab and add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/krashak-db
JWT_SECRET=your-jwt-secret-key-here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
FRONTEND_URL=http://localhost:3000
```

#### Step C: Monitor Deployment
1. Check "Deployments" tab for build logs
2. Wait for "Success" status
3. Get your Railway app URL
4. Test API endpoints

## 🔍 Testing Your Deployed Backend:

### Test URL:
Your Railway app will have URL like: `https://your-app-name.railway.app`

### Test Endpoints:
1. **Health Check**: `GET https://your-app-name.railway.app/`
   - Should return: "Hello From Server"

2. **Auth Routes**: `https://your-app-name.railway.app/auth/*`
3. **Payment Routes**: `https://your-app-name.railway.app/payment/*`
4. **Register Routes**: `https://your-app-name.railway.app/register/*`

## 🚨 Common Issues & Solutions:

### Issue 1: Build Fails
- Check package.json start script
- Verify all dependencies are listed

### Issue 2: Database Connection Error
- Double-check MongoDB URI
- Verify network access (0.0.0.0/0)
- Check database user permissions

### Issue 3: Environment Variables
- Make sure all required vars are set
- No spaces in variable names
- Use exact variable names from code

## 📱 Next Steps After Backend Deploy:
1. Note down your Railway backend URL
2. Update frontend API configuration
3. Test all API endpoints
4. Deploy frontend to Vercel/Netlify