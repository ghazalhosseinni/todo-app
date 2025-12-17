@echo off
echo ========================================
echo    Fixing GitHub Pages Deployment
echo ========================================

echo Adding changes...
git add .

echo Committing...
git commit -m "Fix GitHub Pages deployment workflow"

echo Pushing...
git push origin main

echo ========================================
echo    Done! Now go to GitHub Settings:
echo    1. Go to Settings > Pages
echo    2. Source: GitHub Actions
echo    3. Wait for deployment to complete
echo    4. Check: https://ghazalhosseinni.github.io/todo-app
echo ========================================
pause