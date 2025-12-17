@echo off
echo ========================================
echo    Updating GitHub Pages Configuration
echo ========================================

echo Adding new files...
git add .

echo Creating commit...
git commit -m "Add GitHub Pages deployment configuration"

echo Pushing to GitHub...
git push origin main

echo ========================================
echo    Update completed!
echo    Wait 2-3 minutes then check:
echo    https://ghazalhosseinni.github.io/todo-app
echo ========================================
pause