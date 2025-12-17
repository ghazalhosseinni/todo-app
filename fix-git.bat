@echo off
echo Setting up Git configuration and uploading to GitHub...

REM Set Git user configuration
git config --global user.email "ghazalhosseinni@gmail.com"
git config --global user.name "Ghazal Hosseini"

REM Create commit
git commit -m "initial setup"

REM Change branch name to main
git branch -M main

REM Push to GitHub
git push -u origin main

echo Project uploaded successfully!
pause