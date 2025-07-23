# Deployment Guide for Neurodit

This guide will help you deploy your Neurodit application (Python Flask backend + React frontend) to Render.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Model Files**: Ensure your trained model files exist:
   - `models/chatbot_compile.h5`
   - `models/tokenizer.pkl`

## Step 1: Prepare Your Repository

### 1.1 Commit Your Changes
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Verify Model Files
Make sure your model files are committed to the repository:
```bash
ls -la models/
# Should show:
# chatbot_compile.h5
# tokenizer.pkl
```

## Step 2: Deploy to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 2.2 Deploy Using Blueprint (Recommended)

1. **Create New Blueprint Instance**:
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **Configure Services**:
   - **Backend Service**: Will be created from the Python configuration
   - **Frontend Service**: Will be created from the static site configuration

3. **Set Environment Variables**:
   - Go to your backend service settings
   - Add these environment variables:
     ```
     FLASK_ENV=production
     FLASK_DEBUG=false
     PORT=10000
     ```

### 2.3 Manual Deployment (Alternative)

If you prefer manual deployment:

#### Backend Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `neurodit-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_web.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Port**: `10000`

#### Frontend Service
1. Click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `neurodit-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

## Step 3: Configure Environment Variables

### Backend Service Variables
```
FLASK_ENV=production
FLASK_DEBUG=false
PORT=10000
CORS_ORIGINS=https://your-frontend-url.onrender.com
```

### Frontend Service Variables
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Step 4: Update API Configuration

After deployment, update your frontend's API configuration:

1. Get your backend service URL from Render dashboard
2. Set the `VITE_API_URL` environment variable in your frontend service
3. Redeploy the frontend service

## Step 5: Test Your Deployment

1. **Test Backend**: Visit `https://your-backend-url.onrender.com/status`
2. **Test Frontend**: Visit your frontend URL
3. **Test Chat**: Try sending a message through the chat interface

## Troubleshooting

### Common Issues

1. **Model Loading Errors**:
   - Ensure model files are committed to the repository
   - Check file paths in `app.py`

2. **CORS Errors**:
   - Verify `CORS_ORIGINS` includes your frontend URL
   - Check that `flask-cors` is installed

3. **Build Failures**:
   - Check Render logs for specific error messages
   - Verify all dependencies are in `requirements_web.txt`

4. **Memory Issues**:
   - TensorFlow models can be memory-intensive
   - Consider using Render's paid plans for more resources

### Logs and Debugging

1. **View Logs**: Go to your service dashboard → "Logs"
2. **Check Build Logs**: Look for any build-time errors
3. **Check Runtime Logs**: Look for application errors

## Alternative Deployment Options

### Heroku
- Similar process but uses `Procfile` instead of `render.yaml`
- May require additional configuration for TensorFlow

### Railway
- Good alternative to Render
- Supports both Python and Node.js
- Uses `railway.toml` for configuration

### Vercel (Frontend Only)
- Deploy only the frontend to Vercel
- Deploy backend separately to Render/Heroku
- Update API URLs accordingly

## Cost Considerations

- **Render Free Tier**: Limited resources, may not handle TensorFlow well
- **Render Paid Plans**: Better performance, more memory
- **Model Size**: Large models may require more resources

## Security Notes

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Configure properly for production
3. **Rate Limiting**: Consider adding rate limiting for the chat API
4. **HTTPS**: Render provides HTTPS by default

## Monitoring

1. **Uptime**: Monitor service availability
2. **Performance**: Watch response times
3. **Errors**: Monitor error logs
4. **Usage**: Track API usage and costs

## Support

If you encounter issues:
1. Check Render documentation
2. Review service logs
3. Verify configuration files
4. Test locally first 