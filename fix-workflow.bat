@echo off
echo ========================================
echo    Fixing GitHub Actions Workflow
echo ========================================

git add .
git commit -m "Fix workflow - simplified version"
git push origin main

echo ========================================
echo    Fixed! Check GitHub Actions tab now
echo ========================================
pause