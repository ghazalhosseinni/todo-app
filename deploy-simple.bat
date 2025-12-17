@echo off
echo ========================================
echo    Simple GitHub Pages Deployment
echo ========================================

echo Adding changes...
git add .

echo Committing...
git commit -m "Simplify GitHub Pages deployment"

echo Pushing...
git push origin main

echo ========================================
echo    Steps to complete:
echo    1. Go to GitHub Settings > Pages
echo    2. Source: Deploy from a branch
echo    3. Branch: gh-pages (will appear after first run)
echo    4. Folder: / (root)
echo    5. Wait 2-3 minutes for deployment
echo    6. Check: https://ghazalhosseinni.github.io/todo-app
echo ========================================
pause