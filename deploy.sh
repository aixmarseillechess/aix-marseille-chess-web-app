#!/bin/bash

echo "🚀 Aix-Marseille Chess Club - Deployment Check"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git and push to GitHub first."
    exit 1
fi

# Check if changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit and push your changes first."
    echo "   Run: git add . && git commit -m 'Deploy to production' && git push"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository as origin."
    echo "   Run: git remote add origin https://github.com/yourusername/your-repo.git"
    exit 1
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  No server/.env file found. Make sure to set environment variables in Render dashboard."
fi

# Check package.json files
if [ ! -f "server/package.json" ]; then
    echo "❌ server/package.json not found"
    exit 1
fi

if [ ! -f "client/package.json" ]; then
    echo "❌ client/package.json not found"
    exit 1
fi

# Check if build script exists in client
if ! grep -q '"build"' client/package.json; then
    echo "❌ Build script not found in client/package.json"
    exit 1
fi

echo "✅ All checks passed!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com and sign up/login"
echo "2. Create a new Web Service for the backend"
echo "3. Create a new Static Site for the frontend"
echo "4. Set up environment variables as described in DEPLOYMENT_GUIDE.md"
echo "5. Deploy both services"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🔗 Your GitHub repository: $(git remote get-url origin)" 