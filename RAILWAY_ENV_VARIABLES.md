# Railway Environment Variables

## Required Environment Variables:
Add these in Railway Dashboard → Variables tab:

NODE_ENV=production

# MongoDB Connection (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/krashak-db?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-for-production-use-random-string

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret-key

# CORS Origins (Add Railway URL later)
FRONTEND_URL=http://localhost:3000

## How to get these values:

### 1. MongoDB Atlas (Free):
- Go to mongodb.com/atlas
- Create free cluster
- Create database user
- Get connection string
- Replace <username> and <password>

### 2. Gmail App Password:
- Enable 2FA on Gmail
- Generate App Password:
  - Google Account → Security → App passwords
  - Generate password for "Mail"
  - Use this password in EMAIL_PASS

### 3. Razorpay Keys:
- Sign up at razorpay.com
- Go to Settings → API Keys
- Generate Test/Live keys

### 4. JWT Secret:
- Use any random string (at least 32 characters)
- Example: jwt-secret-key-krashak-backend-production-2024