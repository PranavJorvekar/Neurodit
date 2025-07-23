#!/bin/bash

# Deployment script for Neurodit
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully!"

# Check if models exist
if [ ! -f "models/chatbot_compile.h5" ] || [ ! -f "models/tokenizer.pkl" ]; then
    echo "⚠️  Warning: Model files not found!"
    echo "   Make sure you have trained the model and the files exist in the models/ directory"
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Connect your GitHub repository"
echo "   - Create a new Web Service"
echo "   - Use the render.yaml configuration"
echo ""
echo "3. Set environment variables in Render dashboard"
echo "   - VITE_API_URL (for frontend)"
echo "   - Any other environment variables from env.example" 