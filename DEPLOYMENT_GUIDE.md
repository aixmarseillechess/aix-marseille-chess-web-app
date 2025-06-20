# 🚀 Deployment Guide - Aix-Marseille Chess Club

This guide will help you deploy your chess club application to Render.com.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Database**: You'll need a MongoDB database (MongoDB Atlas recommended)
4. **Cloudinary Account**: For image uploads (optional but recommended)

## 🔧 Environment Variables Setup

### Backend Environment Variables (Set in Render Dashboard)

Create these environment variables in your Render backend service:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/aix-marseille-chess
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Frontend Environment Variables (Set in Render Dashboard)

Create this environment variable in your Render frontend service:

```bash
VITE_API_URL=https://your-backend-service-name.onrender.com
```

## 🚀 Deployment Steps

### Step 1: Deploy Backend API

1. **Go to Render Dashboard**
   - Log in to [render.com](https://render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub repository
   - Select the repository containing your chess club app

3. **Configure Backend Service**
   - **Name**: `aix-marseille-chess-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   - Add all the backend environment variables listed above
   - Make sure to use your actual MongoDB URI and JWT secret

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete
   - Note the URL (e.g., `https://aix-marseille-chess-api.onrender.com`)

### Step 2: Deploy Frontend

1. **Create Another Web Service**
   - Click "New +" → "Static Site"

2. **Configure Frontend Service**
   - **Name**: `aix-marseille-chess-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`
   - **Plan**: Free

3. **Add Environment Variable**
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend service URL (from Step 1)

4. **Deploy**
   - Click "Create Static Site"
   - Wait for the build to complete

## 🔗 Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your frontend service settings
   - Click "Custom Domains"
   - Add your domain (e.g., `chess.aix-marseille.edu`)

2. **Configure DNS**
   - Point your domain to Render's servers
   - Follow Render's DNS configuration instructions

## 🧪 Testing Your Deployment

1. **Test Backend API**
   ```bash
   curl https://your-backend-service.onrender.com/api/health
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Try registering a new user
   - Test creating posts and comments

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify environment variables are set correctly

2. **API Connection Issues**
   - Verify VITE_API_URL is set correctly in frontend
   - Check CORS settings in backend
   - Ensure backend is running and accessible

3. **Database Connection Issues**
   - Verify MONGODB_URI is correct
   - Check MongoDB Atlas network access settings
   - Ensure database user has proper permissions

4. **Image Upload Issues**
   - Verify Cloudinary credentials are correct
   - Check if Cloudinary is properly configured

### Debugging

1. **Check Logs**
   - View logs in Render dashboard
   - Look for error messages and stack traces

2. **Test Locally**
   - Test with production environment variables locally
   - Use `npm run build` to test build process

## 📊 Monitoring

1. **Health Checks**
   - Backend: `/api/health` endpoint
   - Frontend: Static file serving

2. **Performance**
   - Monitor response times in Render dashboard
   - Check for memory and CPU usage

## 🔄 Updates

To update your deployed application:

1. **Push Changes**
   - Push your changes to GitHub
   - Render will automatically redeploy

2. **Manual Redeploy**
   - Go to Render dashboard
   - Click "Manual Deploy" if needed

## 🛡️ Security Considerations

1. **Environment Variables**
   - Never commit secrets to Git
   - Use Render's environment variable system
   - Rotate JWT secrets regularly

2. **CORS**
   - Configure CORS properly for production
   - Only allow necessary origins

3. **Rate Limiting**
   - Consider adding rate limiting for API endpoints
   - Monitor for abuse

## 📞 Support

If you encounter issues:

1. **Check Render Documentation**: [docs.render.com](https://docs.render.com)
2. **View Build Logs**: Check the logs in Render dashboard
3. **Community Support**: Render has a helpful community forum

---

**Happy Deploying! 🎉**

Your Aix-Marseille Chess Club application should now be live and accessible to users worldwide! 