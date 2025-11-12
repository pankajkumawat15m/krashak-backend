# MongoDB Atlas Setup Guide

## Step 1: Create Account
1. Go to https://mongodb.com/atlas
2. Sign up for free account
3. Choose "Shared" (Free tier)

## Step 2: Create Cluster
1. Choose cloud provider: AWS
2. Region: Select closest to your users
3. Cluster Name: krashak-cluster
4. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: krashak-user
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace <username> and <password> with your credentials

## Example Connection String:
```
mongodb+srv://krashak-user:your-password@krashak-cluster.xxxxx.mongodb.net/krashak-db?retryWrites=true&w=majority
```

## Add to Railway:
- Variable Name: MONGODB_URI
- Variable Value: [Your connection string]