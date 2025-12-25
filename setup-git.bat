@echo off
echo ====================================
echo Dave Auto Solutions - GitHub Setup
echo ====================================
echo.

cd /d "c:\My Web Sites\dave"

echo [Step 1/6] Initializing Git repository...
git init

echo.
echo [Step 2/6] Adding all files...
git add .

echo.
echo [Step 3/6] Creating initial commit...
git commit -m "Initial commit: Dave Auto Solutions complete site"

echo.
echo [Step 4/6] Setting up main branch...
git branch -M main

echo.
echo ====================================
echo NEXT STEPS:
echo ====================================
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: dave-auto-solutions
echo 3. DO NOT initialize with README, .gitignore, or license
echo 4. Copy the repository URL (should look like: https://github.com/yourusername/dave-auto-solutions.git)
echo.
echo Then run: deploy-to-github.bat
echo.
pause
