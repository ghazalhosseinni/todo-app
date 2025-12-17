@echo off
echo Uploading project to GitHub...

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Vue 3 Todo App with drag & drop functionality"

REM Add remote repository
git remote add origin https://github.com/ghazalhosseinni/todo-app.git

REM Push to GitHub
git branch -M main
git push -u origin main

echo Project uploaded successfully!
pause