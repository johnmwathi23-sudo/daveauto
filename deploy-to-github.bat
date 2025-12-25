@echo off
echo ====================================
echo Push to GitHub
echo ====================================
echo.

cd /d "c:\My Web Sites\dave"

set /p repo_url="Paste your GitHub repository URL: "

echo.
echo [Step 5/6] Adding remote repository...
git remote add origin %repo_url%

echo.
echo [Step 6/6] Pushing to GitHub...
git push -u origin main

echo.
echo ====================================
echo SUCCESS! Your site is now on GitHub
echo ====================================
echo.
echo Next: Deploy to Vercel
echo 1. Go to https://vercel.com/new
echo 2. Import your GitHub repository
echo 3. Click Deploy (no configuration needed!)
echo.
pause
