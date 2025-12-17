@echo off
echo ========================================
echo    Vue Todo App - GitHub Upload
echo ========================================

echo Step 1: Setting Git configuration...
git config --global user.email "ghazalhosseinni@gmail.com"
git config --global user.name "Ghazal Hosseini"

echo Step 2: Adding all files to Git...
git add .

echo Step 3: Creating initial commit...
git commit -m "Initial commit: Vue 3 Todo App with drag & drop functionality"

echo Step 4: Changing branch to main...
git branch -M main

echo Step 5: Pushing to GitHub...
git push -u origin main

echo ========================================
echo    Upload completed successfully!
echo ========================================
pause